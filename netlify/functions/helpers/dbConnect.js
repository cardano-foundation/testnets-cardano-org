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
