import fs from 'fs';
import path from 'path';
import { Post } from "./types";
import { StreamClient } from "getstream";

const { STREAM_API_KEY, STREAM_CLIENT_ID } = process.env;

const dataPath = path.join(__dirname, '../data.json');
const steamClient = new StreamClient(

);

function readData(): { posts: Post[] } {
    steamClient.feed("user", "user-id");
}

function writeData(data: { posts: Post[] }) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
}

export const resolvers = {
  Query: {
    posts: (): Post[] => {
      return readData().posts;
    },
    post: (_: any, args: { id: string }): Post | undefined => {
      return readData().posts.find(post => post.id === args.id);
    }
  },
  Mutation: {
    createPost: (_: any, args: { title: string, content: string }): Post => {
      const data = readData();
      const newPost = { id: Date.now().toString(), title: args.title, content: args.content };
      data.posts.push(newPost);
      writeData(data);
      return newPost;
    },
    updatePost: (_: any, args: { id: string, title: string, content: string }): Post | undefined => {
      const data = readData();
      const postIndex = data.posts.findIndex(post => post.id === args.id);
      if (postIndex === -1) return undefined;
      const updatedPost = { ...data.posts[postIndex], ...args };
      data.posts[postIndex] = updatedPost;
      writeData(data);
      return updatedPost;
    },
    deletePost: (_: any, args: { id: string }): string => {
      const data = readData();
      data.posts = data.posts.filter(post => post.id !== args.id);
      writeData(data);
      return args.id;
    }
  }
};

