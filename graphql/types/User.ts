import { enumType, extendType, nonNull, objectType, stringArg } from "nexus";
import { Link } from "./Link";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("firstName");
    t.string("lastName");
    t.string("email");
    t.string("image");
    t.field("role", { type: Role });
    t.list.field("bookmarks", {
      type: Link,
      async resolve(_parent, _args, context) {
        return await context.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .bookmarks();
      },
    });
  },
});
export const FindUser = extendType({
  type: "Query",
  definition(t: any) {
    t.nonNull.list.field("findUser", {
      type: "User",
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_root: any, args: any, context: any) {
        return context.prisma.user.findMany({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});
export const FindAllUsers = extendType({
  type: "Query",
  definition(t: any) {
    t.nonNull.list.field("findAllUsers", {
      type: "User",
      resolve(_root: any, _args: any, context: any) {
        return context.prisma.user.findMany();
      },
    });
  },
});
export const CreateUser = extendType({
  type: "Mutation",
  definition(t: any) {
    t.field("createUser", {
      type: "User",
      args: {
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        email: nonNull(stringArg()),
        image: nonNull(stringArg()),
      },
      async resolve(_root: any, args: any, context: any) {
        const newUser = {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          image: args.image,
        };
        return await context.prisma.user.create({ data: newUser });
      },
    });
  },
});
export const DeleteUserMutation = extendType({
  type: "Mutation",
  definition(t: any) {
    t.nonNull.field("deleteUser", {
      type: "User",
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_root: any, args: any, context: any) {
        return context.prisma.user.delete({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});
const Role = enumType({
  name: "Role",
  members: ["USER", "ADMIN"],
});
