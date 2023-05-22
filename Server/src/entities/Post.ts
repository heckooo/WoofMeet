import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

type Pet = "dog" | "cat";


@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => Boolean)
  @Property({ type: "boolean" })
  pet!: boolean;

  @Field(() => String)
  @Property({ type: "date" })
  dropOff?: Date = new Date();

  @Field(() => String)
  @Property({ type: "date" })
  pickUp?: Date = new Date();

  @Field()
  @Property({ type: "text"})
  title!: string;
}