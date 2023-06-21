import { Entity, ManyToOne, PrimaryKey } from "@mikro-orm/core";
import { User } from "./User";
import { Post } from "./Post";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Like {
  @Field(() => Int)
  @PrimaryKey()
  userId: number;

  @ManyToOne(() => User)
  user: User;

  @Field(() => Int)
  @PrimaryKey()
  postId: number;

  @ManyToOne(() => Post, { onDelete: "CASCADE" })
  post: Post;
}