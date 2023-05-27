import { MyContext } from "src/types";
import { Post } from "../entities/Post";
import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() {em}: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("id", () => Int) id: number,
    @Ctx() {em}: MyContext): Promise<Post | null> {
    return em.findOne(Post, {id});
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("pet") pet: string,
    @Arg("accomodation") accomodation: string,
    @Arg("address") address: string,
    @Arg("dropOff") dropOff: Date,
    @Arg("pickUp") pickUp: Date,
    @Arg("size") size: string,
    @Ctx() {em}: MyContext): Promise<Post> {
    const post = em.create(Post, {pet, accomodation, address, size, dropOff, pickUp });

    try {
      await em.persistAndFlush(post);
    } catch (err) {
      console.log(err.message);
    }
    return post;
  } 

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("pet") pet: string,
    @Arg("accomodation") accomodation: string,
    @Arg("address") address: string,
    @Arg("dropOff") dropOff: Date,
    @Arg("pickUp") pickUp: Date,
    @Arg("size") size: string,
    @Ctx() {em}: MyContext): Promise<Post | null> {
    const post = await em.findOne(Post, {id});
    if(!post) {
      return null;
    }
 
    post.pet = pet;
    post.accomodation = accomodation;
    post.address = address;
    post.dropOff = dropOff;
    post.pickUp = pickUp;
    if (typeof size !== undefined) {
      post.size = size;
    }

    await em.persistAndFlush(post);

    return post;
  } 

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() {em}: MyContext): Promise<boolean> {
    // try {
    //   await em.nativeDelete(Post, {id});
    // } catch {
    //   return false;
    // }  
    await em.nativeDelete(Post, {id}); 
    return true;
  } 
}