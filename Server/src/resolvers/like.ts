import { Like } from "../entities/Like";
import { MyContext } from "../types";
import { Resolver, Query, Ctx } from "type-graphql";

@Resolver()
export class LikeResolver {
  @Query(() => [Like])
  async likes(@Ctx() { em }: MyContext): Promise<Like[]> {
     return em.find(Like, {});
  }
}