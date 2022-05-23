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

import { exists, mapValues } from "../runtime";
/**
 *
 * @export
 * @interface SubmissionContract
 */
export interface SubmissionContract {
  /**
   *
   * @type {string}
   * @memberof SubmissionContract
   */
  questionId: string;
  /**
   *
   * @type {Array<string>}
   * @memberof SubmissionContract
   */
  answers: Array<string>;
}

export function SubmissionContractFromJSON(json: any): SubmissionContract {
  return SubmissionContractFromJSONTyped(json, false);
}

export function SubmissionContractFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): SubmissionContract {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    questionId: json["question_id"],
    answers: json["answers"]
  };
}

export function SubmissionContractToJSON(value?: SubmissionContract | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    question_id: value.questionId,
    answers: value.answers
  };
}
