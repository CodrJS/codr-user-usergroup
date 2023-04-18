import type { OpenAPIV3_1 } from "openapi-types";

const UserGroupSchema: OpenAPIV3_1.SchemaObject = {
  title: "User Group Entity Schema",
  allOf: [{ $ref: "#/components/schemas/BaseEntitySchema" }],
  required: ["name", "username", "userId"],
  properties: {
    name: {
      type: "string",
    },
    creatorId: {
      type: "string",
    },
    teams: {
      type: "array",
      items: {
        type: "string",
      },
    },
    members: {
      type: "array",
      items: {
        type: "string",
      },
    },
    flags: {
      type: "object",
      properties: {
        isAnonymous: {
          type: "string",
        },
        isDeleted: {
          type: "string",
        },
        isJoinable: {
          type: "string",
        },
        isPrivate: {
          type: "string",
        },
      },
    },
  },
};

export default UserGroupSchema;
