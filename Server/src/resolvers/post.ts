import { MyContext } from "src/types";
import { Post } from "../entities/Post";
import { Resolver, Query, Ctx, Arg, Int, Mutation, Field, ObjectType } from "type-graphql";
import { FieldError } from "../utils/FieldError";
import { PostInputs } from '../utils/PostInputs';

@ObjectType()
class PostResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Post, { nullable: true })
  post?: Post;
}

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

  @Mutation(() => PostResponse)
  async createPost(
    @Arg("options") options: PostInputs,
    @Ctx() {em}: MyContext): Promise<PostResponse> {    
    const post = em.create(Post, {pet: options.pet, accomodation: options.accomodation, address: options.address, size: options.size, 
      dropOff: options.dropOff, pickUp: options.pickUp
    });
    
    try {
      await em.persistAndFlush(post);
      console.log(post);
    } catch (err) {
      console.log("Error: ", err.message);
    }
    return { post };
  }

  @Mutation(() => PostResponse, { nullable: true })
  async updatePost(
    @Arg("options") options: PostInputs,
    @Arg("id", () => Int) id: number,
    @Ctx() {em}: MyContext): Promise<PostResponse | null> {
    const post = await em.findOne(Post, {id});
    if(!post) {
      return null;
    }
 
    post.pet = options.pet;
    post.accomodation = options.accomodation;
    post.address = options.address;
    post.dropOff = options.dropOff;
    post.pickUp = options.pickUp;
    if (typeof options.size !== undefined) {
      post.size = options.size;
    }

    await em.persistAndFlush(post);

    return { post };
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