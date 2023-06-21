import { MyContext } from "src/types";
import { Post } from "../entities/Post";
import { Resolver, Query, Ctx, Arg, Int, Mutation, UseMiddleware, FieldResolver, Root} from "type-graphql";
import { PostInputs } from '../utils/PostInputs';
import { isAuth } from "../middleware/isAuth";
import { RequiredEntityData } from "@mikro-orm/core";
import { Like } from '../entities/Like';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(
    @Ctx() { em }: MyContext): Promise<Post[]> {
     return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("id", () => Int) id: number,
    @Ctx() {em}: MyContext): Promise<Post | null> {
    return em.findOne(Post, {id});
  }

  // @FieldResolver(() => Boolean, { nullable: true })
  // async likeStatus(
  //   @Root() post: Post,
  //   @Ctx() { }
  // ) {
  //   // Kick off from here
  // }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async like(
    @Arg("postId", () => Int) postId: number,
    @Ctx() { req, em }: MyContext) {
      const { userId } = req.session;

      const post = await em.findOne(Post, { id: postId });
      if (!post) {
        return false;
      }
      
      const like = await em.findOne(Like, {postId, userId});

      if (like) {
        await em.nativeDelete(Like, {postId, userId});
        post.points--;
        em.persistAndFlush(post);
      } else {
        try {
          await em.insert(Like, {postId, userId});
          post.points++;
          em.persistAndFlush(post);
        } catch (err) {
          console.log(err.message);
          return false;
        }
      }

      // if (like && post.likeStatus === true) {
      //   like.count -= 1;
      //   post.points -= 1;
      //   post.likeStatus = false;
      //   em.persistAndFlush(like);
      //   em.persistAndFlush(post);
      // } else if (like && post.likeStatus === false) {
      //   like.count += 1;
      //   post.points += 1;
      //   post.likeStatus = true;
      //   em.persistAndFlush(like);
      //   em.persistAndFlush(post);
      // } else if (!like) {
      //   try {
      //     await em.insert(Like, { 
      //       postId, 
      //       userId, 
      //       count: 1,
      //     });
      //   } catch (err) {
      //     console.error(err);
      //     return false;
      //   }
      // }

      return true;
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("options") options: PostInputs,
    @Ctx() { em, req }: MyContext): Promise<Post> {    
    const post = em.create(Post, {pet: options.pet, accomodation: options.accomodation, address: options.address, size: options.size, 
      dropOff: options.dropOff, pickUp: options.pickUp,
      creatorId: req.session.userId
    } as RequiredEntityData<Post>);
    
    try {
      await em.persistAndFlush(post);
      console.log(post);
    } catch (err) {
      console.log("Error: ", err.message);
    }
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isAuth)
  async updatePost(
    @Arg("options") options: PostInputs,
    @Arg("id", () => Int) id: number,
    @Ctx() {em}: MyContext): Promise<Post | null> {
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

    return post;
  } 

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
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