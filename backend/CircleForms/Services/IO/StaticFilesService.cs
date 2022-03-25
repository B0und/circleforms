﻿using System.IO;
using System.Threading.Tasks;
using CircleForms.Models.Configurations;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace CircleForms.Services.IO;

public class StaticFilesService : IStaticFilesService
{
    private readonly StaticFilesConfig _config;
    private readonly ILogger<StaticFilesConfig> _logger;

    public StaticFilesService(IOptions<StaticFilesConfig> config, ILogger<StaticFilesConfig> logger)
    {
        _logger = logger;
        _config = config.Value;
    }

    public async Task<string> WriteImageAsync(Stream image, string id, string filename)
    {
        filename = Path.ChangeExtension(Path.GetRandomFileName(), Path.GetExtension(filename));
        var directory = Path.GetFullPath(Path.Combine(_config.VolumePath, id));
        Directory.CreateDirectory(directory);

        var filePath = Path.Combine(directory, filename);
        _logger.LogDebug("Writing image to the static path {Path}", filename);
        await using var fileStream = File.OpenWrite(filePath);
        await image.CopyToAsync(fileStream);

        return filename;
    }
}
