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

/**
 * 
 * @export
 * @enum {string}
 */
export enum QuestionType {
    Checkbox = 'Checkbox',
    Freeform = 'Freeform',
    Choice = 'Choice'
}

export function QuestionTypeFromJSON(json: any): QuestionType {
    return QuestionTypeFromJSONTyped(json, false);
}

export function QuestionTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): QuestionType {
    return json as QuestionType;
}

export function QuestionTypeToJSON(value?: QuestionType | null): any {
    return value as any;
}
