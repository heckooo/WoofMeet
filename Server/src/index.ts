import "reflect-metadata";
import "dotenv-safe/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import express from "express";
import { json } from "body-parser";
import { buildSchema } from "type-graphql";
import { MikroORM } from '@mikro-orm/core';
import { COOKIE_NAME, __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { createClient } from "redis";
import RedisStore from "connect-redis";
import cors from "cors";
import expressSession from "express-session";
import Redis from "ioredis";
import { LikeResolver } from "./resolvers/like";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  const redis = new Redis();

  const app = express();

  const redisClient = createClient();
  redisClient.connect().catch(console.error);
  const redisStore = new RedisStore({
    client: redisClient,
    disableTouch: true,
  });

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(
    expressSession({
      name: COOKIE_NAME,
      store: redisStore,
      cookie: {
        maxAge: 1000 * 60 * 60* 24 * 365, // 1 Year
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      }, 
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver, LikeResolver],
      validate: false,

    }),
  });
  await apolloServer.start();

  app.use('/graphql',
  json(),
  expressMiddleware(apolloServer, {
    context: async ({ req, res }) => ({ em: orm.em.fork(), req, res, redis }),
  }),
  );

  const port = parseInt(process.env.PORT) || 4000;

  app.listen(port, () => {
    console.log(`server started on localhost:${port}`);
  })
};

main().catch((err) => {
  console.error(err.message);
});