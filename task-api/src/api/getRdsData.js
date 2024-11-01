const mysql = require('mysql');
let connection;

const dbConfig = {
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DATABASE_NAME || ''
}

const pool = mysql.createPool(dbConfig)

async function executeQuery(){
    try {
        connection = await pool.getConnection()
        const queryResult = await connection.query(query)
        console.log(`queryResult: ${JSON.stringify(queryResult)}`);
        return queryResult;
    } catch (error) {
        console.error(`error occurred while executing the query:: ${error}`);
        throw error;
    } finally{
        await connection.release()
    }
}

exports.handler = async (event) =>{

    console.log(`rds query event received:: ${JSON.stringify(queryResult)}`);
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100),
      age INT
    );
  `;

  // SQL query to insert records
  const insertRecordsQuery = `
    INSERT INTO users (name, email, age) VALUES
    ('John Doe', 'john@example.com', 28),
    ('Jane Smith', 'jane@example.com', 34),
    ('Mike Johnson', 'mike@example.com', 25);
  `;
    const queryresult = await executeQuery(createTableQuery)
    const queryresult2 = await executeQuery(insertRecordsQuery)

    return {
        statusCode: 201, 
        body: JSON.stringify({
          message: "Item created successfully"
        }),
      };

}
