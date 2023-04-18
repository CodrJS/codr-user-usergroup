import { Types, IUser } from "@codrjs/models";
import { UserGroupDocument } from "./UserGroup";

const permissions: Types.Permissions<UserGroupDocument, "UserGroup"> = {
  "codr:system": (_user, { can }) => {
    can("manage", "UserGroup");
  },
  "codr:admin": (_user, { can }) => {
    can("manage", "UserGroup");
  },
  "codr:researcher": (user, { can }) => {
    // can only read it's own UserGroup
    can("read", "UserGroup");
    can("create", "UserGroup");
    can("update", "UserGroup", { userId: user._id });
    can("delete", "UserGroup", { userId: user._id });
  },
  "codr:annotator": (_user, { can }) => {
    // can only read it's own UserGroup
    can("read", "UserGroup");
  },
};

const UserGroupAbility = (user: IUser) => Types.DefineAbility(user, permissions);
export default UserGroupAbility;
