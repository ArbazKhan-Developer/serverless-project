const { LexModelBuildingService } = require("aws-sdk");

module.exports.handler = async (event) => {
  // console.log(`event received:: ${JSON.stringify(event)}`);
  const token = event.authorizationToken;
  console.log(`methodArn:: ${event.methodArn}   end`);
  const isValidateToken = await validateToken(token);
  if (!isValidateToken) {
    return await generateAccessPolicy("user", "Deny", event.methodArn);
  }

  const authResponse = await generateAccessPolicy(
    isValidateToken,
    "Allow",
    event.methodArn
  );
  return authResponse;
};

async function generateAccessPolicy(principalid, effect, resource) {
  try {
    const authResponse = {};
    if (principalid.userName == "user") {
      console.log("assiging user role");
      const principalId = principalid.userName;
      const policyDocument = {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: effect,
            Resource:
              "arn:aws:execute-api:us-east-1:881490120804:j6zh361sre/*/POST/createTask",
          },
          {
            Action: "execute-api:Invoke",
            Effect: effect,
            Resource:
              "arn:aws:execute-api:us-east-1:881490120804:j6zh361sre/*/GET/getTask",
          },
        ],
      };
      return { principalId, policyDocument };
    }
    if (principalid.userName == "admin") {
      console.log("assiging admin role");
      (authResponse.principalId = principalid.userName),
        (authResponse.policyDocument = {
          Version: "2012-10-17",
          Statement: [
            {
              Action: "execute-api:Invoke",
              Effect: effect,
              Resource: "*",
            },
          ],
        });
      return authResponse;
    } else {
      authResponse.principalId = principalid;
      authResponse.policyDocument = {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Deny",
            Resource: resource,
          },
        ],
      };
      return authResponse;
    }
  } catch (error) {
    console.error(`error occurred while generating policyDocument: ${error}`);
    throw error;
  }
}
async function validateToken(token) {
  try {
    if (token == "user-token") {
      return {
        userName: "user",
      };
    } else if (token == "admin-token") {
      return {
        userName: "admin",
      };
    }
    console.log(`provided token is invalid`);
    return false;
  } catch (error) {
    console.error(`error occurred while validating the token:: ${error}`);
    throw error;
  }
}
