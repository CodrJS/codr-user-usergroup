import { Error } from "@codrjs/models";
import { Operation } from "@dylanbulmer/openapi/types/Route";
import { R200, R401, R403, R500 } from "@dylanbulmer/openapi/classes/responses";
import verifyJWT from "@/server/express/middlewares/verifyJWT";
import { UserGroupUtility } from "@/utils/UserGroupUtility";

export const GET: Operation = [
  /* business middleware not expressible by OpenAPI documentation goes here */
  verifyJWT,
  (req, res) => {
    const util = new UserGroupUtility();
    util
      .get(req.user, req.params.userGroupId)
      .then(resp => res.status(200).json(resp))
      .catch((err: Error) => res.status(err.status).json(err));
  },
];

export const PATCH: Operation = [
  /* business middleware not expressible by OpenAPI documentation goes here */
  verifyJWT,
  (req, res) => {
    const util = new UserGroupUtility();
    util
      .update(req.user, req.params.userGroupId, req.body)
      .then(resp => res.status(200).json(resp))
      .catch((err: Error) => res.status(err.status).json(err));
  },
];

export const DELETE: Operation = [
  /* business middleware not expressible by OpenAPI documentation goes here */
  verifyJWT,
  (req, res) => {
    const util = new UserGroupUtility();
    util
      .delete(req.user, req.params.userGroupId)
      .then(resp => res.status(200).json(resp))
      .catch((err: Error) => res.status(err.status).json(err));
  },
];

// 3.0 specification
GET.apiDoc = {
  description: "Get user group from database.",
  tags: ["User Group Management"],
  parameters: [
    {
      in: "path",
      name: "userGroupId",
      schema: {
        type: "string",
      },
      required: true,
      description: "User Group identifier",
    }
  ],
  responses: {
    "200": {
      description: R200.description,
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
  },
  security: [
    {
      Bearer: [],
    },
  ],
};

// 3.0 specification
PATCH.apiDoc = {
  description: "Update userGroup in database.",
  tags: ["User Group Management"],
  parameters: [
    {
      in: "path",
      name: "userGroupId",
      schema: {
        type: "string",
      },
      required: true,
      description: "User Group identifier",
    }
  ],
  responses: {
    "200": {
      description: R200.description,
      content: {
        "application/json": {
          schema: {
            properties: {
              details: {
                type: "object",
                properties: {
                  user: {
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
                  "An unexpected error occurred when trying to update a user group.",
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

// 3.0 specification
DELETE.apiDoc = {
  description: "Delete userGroup from database. This action preforms a soft-delete.",
  tags: ["User Group Management"],
  parameters: [
    {
      in: "path",
      name: "userGroupId",
      schema: {
        type: "string",
      },
      required: true,
      description: "User Group identifier",
    }
  ],
  responses: {
    "200": {
      description: R200.description,
      content: {
        "application/json": {
          schema: {
            properties: {
              details: {
                type: "object",
                properties: {
                  user: {
                    $ref: "#/components/schemas/UserGroupSchema",
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
                  "An unexpected error occurred when trying to delete a user group.",
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
