import { Entity, ManyToMany, PrimaryKey, Property, Rel } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  updatedAt?: Date = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  createdAt?: Date = new Date();

  @Field(() => String)
  @Property({ type: "text"})
  pet!: string;

  @Field(() => String)
  @Property({ type: "text "})
  accomodation!: string;

  @Field(() => String)
  @Property({ type: "text" })
  address!: string;

  @Field(() => String)
  @Property({ nullable: true  })
  dropOff?: string;

  @Field(() => String)
  @Property({ nullable: true })
  pickUp?: string;

  @Field(() => String)
  @Property({ type: "text "})
  size!: string;
}