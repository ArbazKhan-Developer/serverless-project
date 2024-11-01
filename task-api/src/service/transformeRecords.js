const moment = require("moment");

class Transformer {
  async transformUpdate(requestBo) {
    try {
      const updateExpression = [];
      const expressionAttributeValues = {};
      const expressionAttributeNames = {};
      const queryParam = requestBo.queryParam;
      console.log(`queryParam:: ${JSON.stringify(queryParam)}`);
      const body = requestBo.body;
      console.log(`body:: ${JSON.stringify(body)}`);
      for (const [attr, value] of Object.entries(body)) {
        const placeHolder = `:${attr}`;
        console.log(`value:: ${value}`);
        updateExpression.push(`#${attr} = ${placeHolder}`);
        expressionAttributeValues[placeHolder] = value;
        expressionAttributeNames[`#${attr}`] = attr;
      }

      const params = {
        Key: {
          id: queryParam.id.toString(),
          timestamp: queryParam.timestamp.toString(),
        },
        UpdateExpression: `SET ${updateExpression.join(", ")}`,
        ExpressionAttributeValues: expressionAttributeValues,
        ExpressionAttributeNames: expressionAttributeNames,
        ReturnValues: "UPDATED_NEW", // Return the updated attributes
      };
      console.log(`update params:: ${JSON.stringify(params)}`);

      return params;
    } catch (error) {
      console.error(
        `error occurred while transforming update records:: ${error}`
      );
      throw error;
    }
  }

  async transformCreate(body) {
    try {
      let item;
      console.log(`body:: ${JSON.stringify(body)}`);
      const compositKey = {
        id: (Math.floor(Math.random() * (20 - 1 + 1)) + 1).toString(),
        timestamp: moment().format("YYYYMMDDHHMMSSS").toString(),
      };
      if (Object.keys(body) !== 0) {
        item = { ...compositKey, ...body };
      } else {
        item = compositKey;
      }
      console.log(`item:: ${JSON.stringify(item)}`);
      return item;
    } catch (error) {
      console.error(
        `error occurred while transforming create records:: ${error}`
      );
      throw error;
    }
  }

  async transformGet(requestBo) {
    try {
      const queryParam = requestBo.queryParam;
      console.log(`queryParam:: ${JSON.stringify(queryParam)}`);
      const compositKey = {
        id: queryParam.id.toString(),
        timestamp: queryParam.timestamp.toString(),
      };
      return compositKey;
    } catch (error) {
      console.error(`error occurred while transforming get records:: ${error}`);
      throw error;
    }
  }
}

module.exports = new Transformer();
