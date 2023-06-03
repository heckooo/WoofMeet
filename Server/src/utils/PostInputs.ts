import { Field, InputType } from "type-graphql";


@InputType()
export class PostInputs {
  @Field()
  pet: string;
  @Field()
  accomodation: string;
  @Field()
  address: string;
  @Field()
  dropOff: string;
  @Field()
  pickUp: string;
  @Field()
  size: string;
}