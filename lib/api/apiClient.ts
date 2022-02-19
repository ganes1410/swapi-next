import { createClient } from "urql";

/**
 * Using different url becuse of CORS issue
 * https://github.com/graphql/swapi-graphql/issues/184
 */

export const apiClient = createClient({
  url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
});
