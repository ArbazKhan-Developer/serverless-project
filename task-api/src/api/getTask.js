const transformBo = require('../modal/requestBo');
const transformRecords = require("../service/transformeRecords");
const dal = require("../dal/dynamoDbDao");

module.exports.handler = async (event) => {
  console.log(`event: ${JSON.stringify(event)}`);
  const requestBo = await new transformBo(event)
  const getQueryParam = await transformRecords.transformGet(requestBo)  
  const getItem = await dal.getRecords(getQueryParam)
  console.log(`getItem:: ${JSON.stringify(getItem)}`);

  console.log(`queryStringParam: ${JSON.stringify(event.queryStringParameters)}`);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "hello, there returning the response",
        body: JSON.stringify(getItem),
      })
    };
  };
  