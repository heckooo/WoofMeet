import { LoginMutation, MeQuery, MeDocument, RegisterMutation, LogoutMutation, ChangePasswordMutation, LikeMutationVariables, LikesQueryVariables, LikeMutation, PostsQuery, LikesDocument, PostsDocument } from "@/app/generated/graphql";
import { fetchExchange } from "urql";
import { betterUpdateQuery } from './betterUpdateQuery';
import { cacheExchange, Cache } from "@urql/exchange-graphcache";

function invalidateAllPosts(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "posts");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "posts", fi.arguments || {});
  });
}


export const createUrqlClient = (ssrExchange: any) => ({
    url: 'http://localhost:4000/graphql',
    exchanges: [cacheExchange({
      updates: {
        Mutation: {
          like: (_result, args, cache, _info) => {
            cache.invalidate({
              __typename: "Post",
              id: (args as LikeMutationVariables).postId,
            });
          },
          login: (_result, _args, cache, _info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache, 
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },
          register: (_result, _args, cache, _info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache, 
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
          logout: (_result, _args, cache, _info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache, 
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          changePassword: (_result, _args, cache, _info) => {
            betterUpdateQuery<ChangePasswordMutation, MeQuery>(
              cache, 
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          createPost: (_result, _args, cache, _info) => {
            invalidateAllPosts(cache);
          },
        }
      }
    }), 
    ssrExchange,
    fetchExchange,
  ],
    fetchOptions: {
      credentials: "include" as const,
    },
  });