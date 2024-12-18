const transformBo = require('../modal/requestBo');
const transformRecords = require('../service/transformeRecords');
const dal = require('../dal/dynamoDbDao');

exports.handler = async (event) => {
    try {
      // Parse the incoming request body
      console.log(`event received:: ${JSON.stringify(event)}`);
      const requestBo =  await new transformBo(event)
      const updateItem = await transformRecords.transformUpdate(requestBo)  
      const updateRecord = await dal.updateRecords(updateItem)
      
      // Your logic to create an item (e.g., save to a database)
  
      // Return a successful response
      return {
        statusCode: 201,  // HTTP status code for created
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Item updated successfully"
        }),
      };
    } catch (error) {
      console.error('Error creating item:', error);
      return {
        statusCode: 500,  // Internal server error
        body: JSON.stringify({ message: 'Internal Server Error' }),
      };
    }
  };
  