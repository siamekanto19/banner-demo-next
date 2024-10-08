import { GraphQLClient } from 'graphql-request'
export const graphqlServer = new GraphQLClient(
  process.env.GRAPHQL_URI as string
)
