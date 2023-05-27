import { DateType, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

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
  @Property({ type: DateType, nullable: true  })
  dropOff?: Date;

  @Field(() => String)
  @Property({ type: DateType, nullable: true })
  pickUp?: Date;

  @Field(() => String)
  @Property({ type: "text "})
  size!: string;
}