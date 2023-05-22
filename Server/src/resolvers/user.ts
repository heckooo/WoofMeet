import { User } from "../entities/User";
import { Resolver, Mutation, Field, Ctx, Arg, ObjectType, Query } from "type-graphql";
import { MyContext } from '../types';
import argon2 from "argon2";
import { COOKIE_NAME } from "../constants";
import { UsernamePasswordInput } from "../utils/UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { em }: MyContext
  ) {
    //const user = em.findOne(User, { email });
    return true;
  }

  @Query(() => User, { nullable: true })
  async me(
    @Ctx() {req, em }: MyContext
  ): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }

    const user = await em.findOne(User, { id: req.session.userId });

    return user;
  }

 @Mutation(() => UserResponse) 
   async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, { 
      username: options.username,
      email: options.email,
      password: hashedPassword,
    });

    try {
      await em.persistAndFlush(user);
    } catch (err) {
      console.log("error: ", err.message);
      if (err.code === "23505" || err.detail.includes("already exists")) {
        return {
          errors: [{
            field: "username",
            message: "username already taken",
          }],
        }
      }
    }
    // Keeps user logged in after registration
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse) 
   async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, 
      usernameOrEmail.includes('@') ? 
      { email: usernameOrEmail } 
      : { username: usernameOrEmail}
    );
    if (!user) {
      return {
        errors: [{
          field: "usernameOrEmail",
          message: "Username doesn't exist",
        }],
      };
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return { 
        errors: [{
          field: "password",
          message: "Incorrect password",
        }],
      };
    }

    req.session.userId = user.id;
    console.log(req.session);

    return { user };
  } 

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => 
    req.session.destroy((err) => {
      res.clearCookie(COOKIE_NAME);
      if (err) {
        console.log(err.message);
        resolve(false);
        return;
      }

      resolve(true);
    }));
  }
} 
