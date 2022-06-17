import React from "react";

import { IQuestionProps } from "../../types/common-types";
import ErrorMessage from "../ErrorMessage";

// meant to be used inside React Hook Form
const FreeformInputQuestion = ({ question, register, errors, disableEdit }: IQuestionProps) => {
  return (
    <div className="flex flex-col gap-2 bg-black-lighter px-8 py-5 rounded-3xl">
      <label className="text-3xl font-bold" htmlFor={question.question_id as string}>
        {question.title}
        {question.is_optional ? null : <span className="text-pink">*</span>}
      </label>
      <input
        placeholder="Your answer"
        className="input--inline bg-transparent text-2xl font-medium  border-b border-dotted border-white border-opacity-20 p-2 relative transition-colors"
        type="text"
        autoComplete="off"
        {...register(String(question.question_id), {
          required: !question.is_optional,
          disabled: disableEdit
        })}
      />
      {errors[String(question.question_id)] && ErrorMessage({ text: "This question is required*" })}
    </div>
  );
};

export default FreeformInputQuestion;