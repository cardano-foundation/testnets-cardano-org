const ObjectsToCsv = require('objects-to-csv')
const dbConnect = require('./helpers/dbConnect')

// Initialize outside of handler so it can be cached between invokations
let connection

// TODO: Netlify secret
const apiToken = process.env.ALONZO_FACUET_TOKEN

exports.handler = async function (event, context) {
  // Authenticate the incoming request
  if (event.headers.auth !== apiToken) return requestError('Unauthorized', 401)

  // Connect to DB and intitialize the model
  context.callbackWaitsForEmptyEventLoop = false
  connection = await dbConnect(connection)

  // Load the model
  const Address = connection.model('Address')

  // Get the addresses from the database
  let addresses = await Address.find().select('-__v')

  // remove mongo magic from the returned array
  addresses = addresses.map((addr) => addr.toObject())

  // Convert array to csv string
  addresses = await new ObjectsToCsv(addresses).toString()

  // Return the save adddress object and 201 status
  return {
    statusCode: 201,
    body: addresses
  }
}

const requestError = (message, status = 400) => ({
  statusCode: status,
  body: message
})
