import { IUserGroup } from "@codrjs/models";
import { model, Schema, SchemaTypes } from "mongoose";
import {
  AccessibleFieldsModel,
  accessibleFieldsPlugin,
  AccessibleModel,
  accessibleRecordsPlugin,
} from "@casl/mongoose";

export type UserGroupDocument = IUserGroup & AccessibleFieldsModel<IUserGroup>;
const UserGroupSchema = new Schema<UserGroupDocument>(
  {
    creatorId: {
      required: true,
      index: true,
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    members: {
      items: {
        type: SchemaTypes.ObjectId,
        ref: "User",
      },
    },
    teams: {
      items: {
        type: SchemaTypes.ObjectId,
        ref: "UserGroup",
      },
    },
    name: {
      type: "String",
      required: true,
      index: true,
      default: "Unnamed Group",
    },
    flags: {
      type: {
        isAnonymous: Boolean,
        isDeleted: Boolean,
        isJoinable: Boolean,
        isPrivate: Boolean,
      },
      required: true,
      default: {
        isAnonymous: false,
        isDeleted: false,
        isJoinable: false,
        isPrivate: false,
      },
    },
    createdAt: { type: String },
    updatedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

// exports UserGroup model.
UserGroupSchema.plugin(accessibleFieldsPlugin);
UserGroupSchema.plugin(accessibleRecordsPlugin);
const UserGroup = model<IUserGroup, AccessibleModel<UserGroupDocument>>(
  "UserGroup",
  UserGroupSchema
);
export default UserGroup;
