import { DateType, Entity, PrimaryKey, Property } from "@mikro-orm/core";
//import { Field, ObjectType } from "type-graphql";


// @ObjectType()
// @Entity()
// export class Post {
//   @Field()
//   @PrimaryKey()
//   id!: number;

//   @Field(() => String)
//   @Property()
//   createdAt = new Date();

//   @Field(() => String)
//   @Property({ onUpdate: () => new Date() })
//   updatedAt = new Date();

//   @Field()
//   @Property()
//   title!: string;
// }

@Entity()
export class Post {
  @PrimaryKey()
  id!: number;

  @Property({ type: DateType, nullable: true })
  createdAt?: Date = new Date();

  @Property({ type: DateType, onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date = new Date();

  @Property({ type: "text" })
  title!: string;
}