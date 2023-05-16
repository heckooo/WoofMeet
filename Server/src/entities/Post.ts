import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date", nullable: true })
  createdAt?: Date = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date = new Date();

  @Field()
  @Property({ type: "text" })
  title!: string;
}