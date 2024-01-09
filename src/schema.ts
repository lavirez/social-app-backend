import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  input SignInInput { 
    username: String!
    password: String!
  }

  input SignUpInput { 
    username: String!
    email: String! 
    password: String!
    passowrdConf: String!
  }

  type User { 
    id: ID!
    username: String!
    dateJoined: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
  }

  type Query {
    posts: [Post]
    post(id: ID!): Post
    signIn(input: SignInInput): LoginResponse
    signUp(input: SignUpInput): LoginResponse
  }

  type Mutation {
    createPost(title: String!, content: String!): Post
    updatePost(id: ID!, title: String, content: String): Post
    deletePost(id: ID!): ID
  }
`;

