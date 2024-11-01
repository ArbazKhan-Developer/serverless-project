const aws = require("aws-sdk");
const dynamoDb = new aws.DynamoDB.DocumentClient();
const tableName = process.env.TABLENAME || "MyTaskDb";

class DynamoDBDao {
  async updateRecords(params) {
    try {
      console.log(params);
      params.TableName = tableName
      console.log(params);
      const result = await dynamoDb.update(params).promise();
      console.log(result);
      console.log("Item Updated successfully");
    } catch (error) {
      console.error(
        `error occurred while updating the dynamoDb Item:: ${error}`
      );
      throw error;
    }
  }

  async createRecords(item) {
    try {
      const params = {
        TableName: tableName,
        Item: item,
      };

      const result = await dynamoDb.put(params).promise();
      return result;
    } catch (error) {
      console.log(
        `error occurred while creating the record in dynamodb:: ${error}`
      );
      throw error;
    }
  }

  async getRecords(key) {
    try {
      const params = {
        TableName: tableName,
        Key: key,
      };

      const result = await dynamoDb.get(params).promise();
      console.log(result);
      return result;
    } catch (error) {
      console.log(
        `error occurred while getting the record from dynamodb:: ${error}`
      );
      throw error;
    }
  }

  async deleteRecords(key) {
    try {
      const params = {
        TableName: tableName,
        Key: key,
      };

      const result = await dynamoDb.delete(params).promise();
      return result;
    } catch (error) {
      console.log(
        `error occurred while creating the record in dynamodb:: ${error}`
      );
      throw error;
    }
  }
}

module.exports = new DynamoDBDao();
