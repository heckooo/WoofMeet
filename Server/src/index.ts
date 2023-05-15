import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
// import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
// import path from "path";
import express from "express";
import { json } from "body-parser";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import { PostResolver } from "./resolvers/post";
//import { PostResolver } from "./resolvers/post";

const main = async () => {
  // const conn = await createConnection({
  //   type: "postgres",
  //   //url: process.env.DATABASE_URL,
  //   host: "localhost",
  //   port: 5432,
  //   username: "postgres",
  //   password: "pass",
  //   database: "woof",
  //   logging: true,
  //   // migrationsRun: true,
  //   // synchronize: true,
  //   migrations: [path.join(__dirname, "./migrations/*")],
  //   entities: [Post],
  // });
  // await conn.runMigrations();
 
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  // const fork = orm.em.fork();
  // // const post = fork.create(Post, {createdAt: '2023-05-13', updatedAt: '2023-05-13', title: "fourth post"});
  // // await fork.persistAndFlush(post);
  // const posts = await fork.find(Post, {});
  // console.log(posts);

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
  });
  await apolloServer.start();
  app.use('/graphql', json(),
  expressMiddleware(apolloServer, {
    context: async () => ({ em: orm.em.fork() }),
  }),
  );

  app.listen(4000, () => {
    console.log("server started on localhost:4000")
  })
};

main().catch((err) => {
  console.error(err.message);
});