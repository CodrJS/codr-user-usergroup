import { Error } from "@codrjs/models";
import { Operation } from "@dylanbulmer/openapi/types/Route";
import verifyJWT from "../../../middlewares/verifyJWT";
import { UserGroupUtility } from "@/utils/UserGroupUtility";
import { R201, R401, R403, R500 } from "@dylanbulmer/openapi/classes/responses";

export const POST: Operation = [
  /* business middleware not expressible by OpenAPI documentation goes here */
  verifyJWT,
  (req, res) => {
    const util = new UserGroupUtility();
    util
      .create(req.user, req.body)
      .then(resp => res.status(200).json(resp))
      .catch((err: Error) => res.status(err.status).json(err));
  },
];

// 3.0 specification
POST.apiDoc = {
  description: "Create a user group in the database.",
  tags: ["User Group Management"],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/UserGroupEntitySchema" },
      },
    },
  },
  responses: {
    "201": {
      description: R201.description,
      content: {
        "application/json": {
          schema: {
            properties: {
              details: {
                type: "object",
                properties: {
                  userGroup: {
                    $ref: "#/components/schemas/UserGroupEntitySchema",
                  },
                },
              },
              message: {
                type: "string",
                examples: ["OK"],
              },
            },
          },
        },
      },
    },
    "401": {
      description: R401.description,
      content: {
        "application/json": {
          schema: {
            properties: {
              status: {
                type: "number",
                examples: [401],
              },
              message: {
                type: "string",
                examples: ["User is unauthorized."],
              },
              details: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
    "403": {
      description: R403.description,
      content: {
        "application/json": {
          schema: {
            properties: {
              status: {
                type: "number",
                examples: [403],
              },
              message: {
                type: "string",
                examples: ["User is forbidden from reading this user group."],
              },
              details: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
    "500": {
      description: R500.description,
      content: {
        "application/json": {
          schema: {
            properties: {
              status: {
                type: "number",
                examples: [500],
              },
              message: {
                type: "string",
                examples: [
                  "An unexpected error occurred when trying to create a user group.",
                ],
              },
              details: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
  },
  security: [
    {
      Bearer: [],
    },
  ],
};
