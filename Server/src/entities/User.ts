import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Like } from "./Like";

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field()
  @Property({ type: "text", unique: true })
  username!: string;

  @Field()
  @Property({ type: "text", unique: true })
  email!: string;

  @Property({ type: "text" })
  password!: string;

  @OneToMany(() => Like, like => like.user)
  likes: Like[];

  @Field(() => String)
  @Property({ type: "date" })
  createdAt?: Date = new Date();

  @Field()
  @Property({ type: "date", onUpdate: () => new Date()})
  updatedAt?: Date = new Date();
}