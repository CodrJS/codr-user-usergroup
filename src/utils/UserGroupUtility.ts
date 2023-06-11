import { subject } from "@casl/ability";
import {
  Types as CodrTypes,
  UserGroup,
  IUserGroup,
  Utility,
  Error,
  Response,
} from "@codrjs/models";
import Mongo from "./Mongo";
import { Types } from "mongoose";
import { Abilities, Documents } from "@codrjs/mongo";

// define types
type Document = Documents.UserGroupDocument;
type JwtPayload = CodrTypes.JwtPayload;
const MongoUserGroup = Mongo.User.UserGroup;

export class UserGroupUtility extends Utility {
  // an internal method for getting the desired document to check against permissions
  protected async _getDocument<T>(id: string) {
    try {
      return (await MongoUserGroup.findById(id)) as T;
    } catch (err) {
      throw new Error({
        status: 500,
        message: "Something went wrong when fetching user group.",
        details: {
          userId: id,
          error: err,
        },
      });
    }
  }

  async get(token: JwtPayload, id: string) {
    // get desired user document
    const userGroup = await this._getDocument<Document>(id);

    // if user and read the document, send it, else throw error
    if (
      Abilities.UserGroupAbility(token).can(
        "read",
        subject("UserGroup", userGroup)
      )
    ) {
      return new Response({
        message: "OK",
        details: {
          user: new UserGroup(userGroup),
        },
      });
    } else {
      throw new Error({
        status: 403,
        message: "User is forbidden from reading this user group.",
      });
    }
  }

  async create(token: JwtPayload, obj: IUserGroup) {
    // if user can create user groups
    if (Abilities.UserGroupAbility(token).can("create", "UserGroup")) {
      try {
        // create user, set created by.
        const userGroup = await MongoUserGroup.create({
          ...obj,
          createdBy: token._id as Types.ObjectId,
        });
        return new Response({
          message: "OK",
          details: {
            user: new UserGroup(userGroup),
          },
        });
      } catch (e) {
        throw new Error({
          status: 500,
          message:
            "An unexpected error occurred when trying to create a user group.",
          details: e,
        });
      }
    } else {
      throw new Error({
        status: 403,
        message: "User is forbidden from creating user groups.",
      });
    }
  }

  async update(token: JwtPayload, id: string, obj: Partial<IUserGroup>) {
    // get desired user group document
    const userGroup = await this._getDocument<Document>(id);

    // check permissions
    if (
      Abilities.UserGroupAbility(token).can(
        "update",
        subject("UserGroup", userGroup)
      )
    ) {
      try {
        // update user.
        const userGroup = (await MongoUserGroup.findByIdAndUpdate(id, obj, {
          returnDocument: "after",
        })) as Document;

        // return true if succeeded, else throw error
        return new Response({
          message: "OK",
          details: {
            user: new UserGroup(userGroup),
          },
        });
      } catch (e) {
        throw new Error({
          status: 500,
          message:
            "An unexpected error occurred when trying to update a user group.",
          details: e,
        });
      }
    } else {
      throw new Error({
        status: 403,
        message: "User is forbidden from updating this user group.",
      });
    }
  }

  /**
   * @todo Hard or soft delete users?
   */
  async delete(token: JwtPayload, id: string) {
    throw new Error({
      status: 500,
      message: "Method not implemented.",
    });

    // expected return???
    return new Response({
      message: "OK",
      details: {
        user: undefined,
      },
    });
  }
}
