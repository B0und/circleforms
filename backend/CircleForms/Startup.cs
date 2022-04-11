using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using CircleForms.Contracts.ContractModels.Mappings;
using CircleForms.Controllers.Authorization.Configuration;
using CircleForms.Database.Services;
using CircleForms.Database.Services.Abstract;
using CircleForms.ExternalAPI.OsuApi;
using CircleForms.ExternalAPI.OsuApi.Configurations;
using CircleForms.ExternalAPI.OsuApi.Mapping;
using CircleForms.IO.FileIO;
using CircleForms.IO.FileIO.Abstract;
using CircleForms.IO.FileIO.Configuration;
using CircleForms.ModelLayer;
using CircleForms.ModelLayer.Answers;
using CircleForms.ModelLayer.Publish;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;
using MongoDB.Entities;
using Newtonsoft.Json.Converters;
using StackExchange.Redis;

namespace CircleForms;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        var config = Configuration.GetSection("osuApi");
        services.Configure<OsuApiConfig>(config);
        services.Configure<SuperAdminsId>(Configuration.GetSection("SuperAdmins"));
        services.Configure<StaticFilesConfig>(Configuration.GetSection("StaticFiles"));

        services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());
        services.AddAutoMapper(x =>
            x.AddProfiles(new Profile[] {new ContractProfile(), new OsuApiMapper()}));


        services.AddAuthentication("InternalCookies")
            .AddCookie("InternalCookies", options =>
            {
                // set some paths to empty to make auth not redirect API calls
                options.LoginPath = string.Empty;
                options.AccessDeniedPath = string.Empty;
                options.LogoutPath = string.Empty;
                options.Cookie.Path = "/";
                options.SlidingExpiration = true;
                options.Events.OnValidatePrincipal = context =>
                {
                    var name = context.Principal?.Identity?.Name;
                    if (string.IsNullOrEmpty(name) || !long.TryParse(name, out _))
                    {
                        context.RejectPrincipal();
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    }

                    return Task.CompletedTask;
                };

                static Task UnauthorizedRedirect(RedirectContext<CookieAuthenticationOptions> context)
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;

                    return Task.CompletedTask;
                }

                options.Events.OnRedirectToLogin = UnauthorizedRedirect;
                options.Events.OnRedirectToAccessDenied = UnauthorizedRedirect;
            })
            .AddCookie("ExternalCookies")
            .AddOAuth("osu", options =>
            {
                options.SignInScheme = "ExternalCookies";

                options.TokenEndpoint = "https://osu.ppy.sh/oauth/token";
                options.AuthorizationEndpoint = "https://osu.ppy.sh/oauth/authorize";
                options.ClientId = config["ClientID"];
                options.ClientSecret = config["ClientSecret"];
                options.CallbackPath = config["CallbackUrl"];
                options.Scope.Add("public");

                options.SaveTokens = true;

                options.Validate();
            });

        services.AddSingleton<IOsuApiProvider, OsuApiProvider>();
        services.AddTransient<IUserRepository, UserRepository>();
        services.AddTransient<IPostRepository, PostRepository>();
        services.AddTransient<IAnswerService, AnswerService>();
        services.AddTransient<IPublishService, PublishService>();
        services.AddTransient<PostsService>();
        services.AddTransient<ICacheRepository, RedisCacheRepository>();
        services.AddTransient<IStaticFilesService, StaticFilesService>();

        DB.InitAsync("circleforms",
            MongoClientSettings.FromConnectionString(Configuration.GetConnectionString("Database"))).Wait();

        var multiplexer = ConnectionMultiplexer.Connect(Configuration.GetConnectionString("Redis"));
        services.AddSingleton<IConnectionMultiplexer>(multiplexer);

        services.AddControllers()
            .AddNewtonsoftJson(opts => opts.SerializerSettings.Converters.Add(new StringEnumConverter()));

        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo {Title = "CircleForms", Version = "v1"});
            c.EnableAnnotations();

            var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
        });
        services.AddSwaggerGenNewtonsoftSupport();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.UseForwardedHeaders(new ForwardedHeadersOptions {ForwardedHeaders = ForwardedHeaders.All});

        var basePath = Configuration.GetValue<string>("PathBase");
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger(c =>
            {
                c.RouteTemplate = "swagger/{documentName}/swagger.json";
                c.PreSerializeFilters.Add((swaggerDoc, httpReq) =>
                {
                    swaggerDoc.Servers = new List<OpenApiServer>
                        {new() {Url = $"{httpReq.Scheme}://{httpReq.Host.Value}{basePath}"}};
                });
            });
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CircleForms v1"));

            app.UseCookiePolicy(new CookiePolicyOptions
            {
                Secure = CookieSecurePolicy.None,
                MinimumSameSitePolicy = SameSiteMode.None
            });
        }
        else
        {
            app.Use((context, next) =>
            {
                context.Request.Scheme = "https";

                return next(context);
            });

            app.UseCookiePolicy(new CookiePolicyOptions
            {
                Secure = CookieSecurePolicy.SameAsRequest,
                MinimumSameSitePolicy = SameSiteMode.Lax
            });
        }

        app.UsePathBase(basePath);

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
    }
}
