const dbConnect = require('./helpers/dbConnect')

// Initialize outside of handler so it can be cached between invokations
let connection

// Allow Cors
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
}

exports.handler = async function (event, context) {
  // Grab the address from the request body
  let address
  try {
    address = JSON.parse(event.body).address
  } catch (e) {
    return requestError('Malformed JSON')
  }

  // Validate the provided address
  if (!address || address.length !== 108) {
    return requestError('Please provide a valid Alonzo receive address')
  }

  // Connect to DB and intitialize the model
  context.callbackWaitsForEmptyEventLoop = false
  connection = await dbConnect(connection)

  // Load the model
  const Address = connection.model('Address')

  // Save the address to the database
  const savedAddress = await new Address({ address, date: Date.now() }).save()

  // Return the save adddress object and 201 status
  return {
    statusCode: 201,
    body: JSON.stringify(savedAddress),
    headers
  }
}

const requestError = (message, status = 400) => ({
  statusCode: status,
  body: message,
  headers
})
