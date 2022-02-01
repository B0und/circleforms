﻿using AutoMapper;
using CircleForms.Contracts.V1.ContractModels.Response;
using CircleForms.Contracts.V1.Request;
using CircleForms.Models;
using CircleForms.Models.Posts;
using CircleForms.Models.Posts.Questions.Submissions;

namespace CircleForms.Contracts.V1.ContractModels.Mappings;

public class ContractV1Profile : Profile
{
    public ContractV1Profile()
    {
        CreateMap<User, UserResponseContract>();

        CreateMap<Post, PostResponseContract>();
        CreateMap<PostRedis, PostMinimalResponseContract>();

        CreateMap<SubmissionContract, Submission>();
    }
}
