import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import path from "path";

export default {
  dbName: 'woof',
  type: 'postgresql',
  user: 'postgres',
  password: 'pass',
  debug: !__prod__,
  entities: [Post, User],
  migrations: {
    path: path.join(__dirname, "./migrations"),
    glob: '!(*.d).{js,ts}',
  },
} as Parameters<typeof MikroORM.init>[0];