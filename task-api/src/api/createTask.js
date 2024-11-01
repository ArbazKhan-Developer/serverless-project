const transformBo = require("../modal/requestBo");
const transformRecords = require("../service/transformeRecords");
const dal = require("../dal/dynamoDbDao");

exports.handler = async (event) => {
  try {
    console.log(`event received:: ${JSON.stringify(event)}`);
    const requestBo = new transformBo(event);
    // Your logic to create an item (e.g., save to a database)
    const createpayload = await transformRecords.transformCreate(
      requestBo.body
    );
    const createrecords = await dal.createRecords(createpayload);
    console.log(`record created successfullt in dynamoDb:: ${JSON.stringify(createrecords)}`);
    // Return a successful response
    return {
      statusCode: 201, // HTTP   status code for created
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Item created successfully",
        body: createpayload.compositKey
      }),
    };
  } catch (error) {
    console.error("Error creating item:", error);
    return {
      statusCode: 500, // Internal server error
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
