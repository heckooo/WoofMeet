import { Post } from "src/entities/Post";
import { Resolver, Query, Int } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return "Hello World";
  }
}