const mongoose = require('mongoose')

// TODO: netlify secret
const uri = process.env.MONGO_URI

module.exports = async function (connection) {
  if (!connection) {
    connection = await mongoose.createConnection(uri, {
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // and MongoDB driver buffering
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    // TODO fix the date as it's always being set to when the DB connection is opened!
    connection.model(
      'Address',
      new mongoose.Schema({
        address: String,
        created: { type: Date, default: Date.now() }
      })
    )
  }

  return connection
}
