import React, { useContext } from "react";
import InferNextPropsType from "infer-next-props-type";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import ResponseSubmission from "src/components/ResponseSubmission";
import UserContext from "src/context/UserContext";
import DefaultLayout from "src/layouts";
import { getApiClient } from "src/utils/getApiClient";
import { AsyncReturnType } from "src/utils/misc";

import { convertServerAnswerStateToLocal } from "../form/[formid]/[osuid]";

// https://github.com/vercel/next.js/issues/15913#issuecomment-950330472
type ServerSideProps = InferNextPropsType<typeof getServerSideProps>;

// TODO fixme
const AnswerPage = (props: ServerSideProps) => {
  const { user } = useContext(UserContext);

  return (
    <DefaultLayout>
      <Head>
        <title>CircleForms - {props.post?.title}</title>
      </Head>

      <ResponseSubmission
        post={props.post}
        authorUser={props.authorUser}
        initialUserAnswers={props.filteredUserAnswers}
        urlOsuId={user?.id!}
      />
    </DefaultLayout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // we need to create a new apiClient because cookies are not present on the server
  const apiClient = getApiClient(context.req.headers.cookie);
  const formid = context.params?.id || "";

  const promises = await Promise.allSettled([
    import(`../../messages/single-form/${context.locale}.json`),
    import(`../../messages/global/${context.locale}.json`),
    apiClient.posts.postsIdGet({ id: formid as string })
  ]);

  const [translations, global, postData] = promises.map((p) =>
    p.status === "fulfilled" ? p?.value : null
  );

  // typescript doesnt infer these types :(
  const typedPost = postData as AsyncReturnType<typeof apiClient.posts.postsIdGet>;

  // if there are no answers, go look at not found screen
  if (!typedPost.answer) {
    return {
      notFound: true
    };
  }

  // fetch author info
  const authorUser = await apiClient.users.usersIdGet({
    id: typedPost.post?.author_id as string
  });

  // Try to get user`s post answers
  let mappedAnswers: Record<string, string[]> = {};
  typedPost.answer?.forEach((submission) => {
    if (submission.question_id) {
      mappedAnswers[submission.question_id] = submission.answers || [];
    }
  });

  const filteredUserAnswers = convertServerAnswerStateToLocal(
    mappedAnswers,
    typedPost.post?.questions!
  );

  const messages = {
    ...translations,
    ...global
  };

  return {
    props: {
      post: typedPost.post,
      authorUser,
      messages,
      filteredUserAnswers
    }
  };
};

export default AnswerPage;