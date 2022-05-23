// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
/**
 * CircleForms
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    PageContract,
    PageContractFromJSON,
    PageContractToJSON,
    PostFilter,
    PostFilterFromJSON,
    PostFilterToJSON,
    ProblemDetails,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
} from '../models';

export interface PostsPagePageGetRequest {
    page: number;
    pageSize?: number;
    filter?: PostFilter;
}

export interface PostsPagePinnedPostRequest {
    post?: string;
}

/**
 * 
 */
export class PagesApi extends runtime.BaseAPI {

    /**
     * Get posts page.
     */
    async postsPagePageGetRaw(requestParameters: PostsPagePageGetRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<PageContract>> {
        if (requestParameters.page === null || requestParameters.page === undefined) {
            throw new runtime.RequiredError('page','Required parameter requestParameters.page was null or undefined when calling postsPagePageGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.pageSize !== undefined) {
            queryParameters['pageSize'] = requestParameters.pageSize;
        }

        if (requestParameters.filter !== undefined) {
            queryParameters['filter'] = requestParameters.filter;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/posts/page/{page}`.replace(`{${"page"}}`, encodeURIComponent(String(requestParameters.page))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PageContractFromJSON(jsonValue));
    }

    /**
     * Get posts page.
     */
    async postsPagePageGet(requestParameters: PostsPagePageGetRequest, initOverrides?: RequestInit): Promise<PageContract> {
        const response = await this.postsPagePageGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get all pinned posts
     */
    async postsPagePinnedGetRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<PageContract>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/posts/page/pinned`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PageContractFromJSON(jsonValue));
    }

    /**
     * Get all pinned posts
     */
    async postsPagePinnedGet(initOverrides?: RequestInit): Promise<PageContract> {
        const response = await this.postsPagePinnedGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Add post to pinned posts. (Requires auth, Admin/Moderator role)\"
     */
    async postsPagePinnedPostRaw(requestParameters: PostsPagePinnedPostRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        if (requestParameters.post !== undefined) {
            queryParameters['post'] = requestParameters.post;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/posts/page/pinned`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Add post to pinned posts. (Requires auth, Admin/Moderator role)\"
     */
    async postsPagePinnedPost(requestParameters: PostsPagePinnedPostRequest = {}, initOverrides?: RequestInit): Promise<void> {
        await this.postsPagePinnedPostRaw(requestParameters, initOverrides);
    }

}
