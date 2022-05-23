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

import { exists, mapValues } from '../runtime';
import {
    AnswerContract,
    AnswerContractFromJSON,
    AnswerContractFromJSONTyped,
    AnswerContractToJSON,
} from './AnswerContract';
import {
    UserInAnswerContract,
    UserInAnswerContractFromJSON,
    UserInAnswerContractFromJSONTyped,
    UserInAnswerContractToJSON,
} from './UserInAnswerContract';

/**
 * 
 * @export
 * @interface AnswersUsersContract
 */
export interface AnswersUsersContract {
    /**
     * 
     * @type {Array<UserInAnswerContract>}
     * @memberof AnswersUsersContract
     */
    users?: Array<UserInAnswerContract> | null;
    /**
     * 
     * @type {Array<AnswerContract>}
     * @memberof AnswersUsersContract
     */
    answers?: Array<AnswerContract> | null;
}

export function AnswersUsersContractFromJSON(json: any): AnswersUsersContract {
    return AnswersUsersContractFromJSONTyped(json, false);
}

export function AnswersUsersContractFromJSONTyped(json: any, ignoreDiscriminator: boolean): AnswersUsersContract {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'users': !exists(json, 'users') ? undefined : (json['users'] === null ? null : (json['users'] as Array<any>).map(UserInAnswerContractFromJSON)),
        'answers': !exists(json, 'answers') ? undefined : (json['answers'] === null ? null : (json['answers'] as Array<any>).map(AnswerContractFromJSON)),
    };
}

export function AnswersUsersContractToJSON(value?: AnswersUsersContract | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'users': value.users === undefined ? undefined : (value.users === null ? null : (value.users as Array<any>).map(UserInAnswerContractToJSON)),
        'answers': value.answers === undefined ? undefined : (value.answers === null ? null : (value.answers as Array<any>).map(AnswerContractToJSON)),
    };
}
