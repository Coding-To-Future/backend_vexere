const pathUsers = {
  post: {
    tags: ["Users"],
    summary: "Create new user",
    parameters: [
      {
        name: "user",
        in: "body",
        description: "User with new values of properties",
        required: true,
        schema: {
          $ref: "#/definitions/User"
        }
      }
    ],
    responses: {
      "200": {
        description: "New user created",
        schema: {
          $ref: "#/definitions/User"
        }
      },
      "405": { description: "Invalid input" }
    }
  },
  get: {
    tags: ["Users"],
    summary: "Get all user",
    responses: {
      "200": {
        description: "OK",
        schema: {
          $ref: "#/definitions/User"
        }
      }
    }
  }
};

const pathUsersId = {
  parameters: [
    {
      name: "userId",
      in: "path",
      required: true,
      description: "ID of user that we want to find",
      type: "string"
    }
  ],
  get: {
    tags: ["Users"],
    summary: "Get user with given ID",
    responses: {
      "200": {
        description: "User is found",
        schema: {
          $ref: "#/definitions/User"
        }
      }
    }
  },
  delete: {
    summary: "Delete user with given ID",
    tags: ["Users"],
    responses: {
      "200": {
        description: "User is deleted",
        schema: {
          $ref: "#/definitions/User"
        }
      }
    },
    security: [
      {
        token: []
      }
    ]
  },
  put: {
    summary: "Update user with give ID",
    tags: ["Users"],
    parameters: [
      {
        name: "user",
        in: "body",
        description: "User with new values of properties",
        schema: {
          $ref: "#/definitions/User"
        }
      }
    ],
    responses: {
      "200": {
        description: "User is updated",
        schema: {
          $ref: "#/definitions/User"
        }
      }
    },
    security: [
      {
        token: []
      }
    ]
  }
};

const pathUserLogin = {
  post: {
    tags: ["Users"],
    summary: "User login",
    parameters: [
      {
        name: "user",
        in: "body",
        description: "The email and password for login",
        required: true,
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string"
            },
            password: { type: "string" }
          }
        }
      }
    ],
    responses: {
      "200": {
        description: "Login successfully",
        schema: {
          type: "object",
          properties: {
            // message: {
            //   type: "string"
            // },
            token: { type: "string" }
          }
        }
      },
      "404": { description: "Email or password incorrect" }
    }
  }
};

const pathUserUploadAvatar = {
  post: {
    tags: ["Users"],
    summary: "User upload an image for avatar",
    consumes: ["multipart/form-data"],
    parameters: [
      {
        name: "avatar",
        in: "formData",
        description: "File image to upload",
        required: true,
        type: "file"
      }
    ],
    responses: {
      "200": {
        description: "Upload successfully",
        schema: {
          type: "object"
        }
      }
    },
    security: [
      {
        token: []
      }
    ]
  }
};
const definitionUser = {
  type: "object",
  required: ["email", "password", "password2", "fullName"],
  properties: {
    email: {
      type: "string"
    },
    password: {
      type: "string"
    },
    password2: {
      type: "string"
    },
    fullName: {
      type: "string"
    }
  }
};

module.exports = {
  pathUsers,
  pathUsersId,
  pathUserLogin,
  pathUserUploadAvatar,
  definitionUser
};
