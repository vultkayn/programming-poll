const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
mongoose.set("strictQuery", false);
const username = encodeURIComponent(process.env.MONGO_DB_USER);
const password = encodeURIComponent(process.env.MONGO_DB_PASS);
const mongoDBURL = `mongodb+srv://${username}:<password>@cluster0.mug6fr1.mongodb.net/?retryWrites=true&w=majority`;
const mongoDBURL_priv = `mongodb+srv://${username}:${password}@cluster0.mug6fr1.mongodb.net/?retryWrites=true&w=majority`;

const debug = require('debug')('bta-poll-server:server')

console.log(process.env.NODE_ENV);

let dbName = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
  ?  process.env.MONGO_DEV_DB_NAME 
  : process.env.MONGO_DB_NAME);

mongoose
  .connect(mongoDBURL_priv, {
    dbName: dbName,
    /* ssl: true,
    sslValidate: true,
    sslCA: `${__dirname}/rootCA.pem`,
    authMechanism: 'MONGODB-X509' */
  })
  .then(() => debug(`Connected to MongoDB at ${mongoDBURL}`))
  .catch((err) => {debug(err); process.exit(1);});

mongoose.connection
  .on("close", () => debug(`Closed connection to ${mongoDBURL}`))


const store = MongoStore.create({
    client: mongoose.connection.getClient(),
    dbName: "mongo_store",
    collectionName: "sessions"
  })
/* // FIXME see solution to log even after tests   
  .on('create', () => debug("A session has been created"))
  .on('update', () => debug("A session has been updated"))
  .on('destroy', () => debug("A session has been destroyed")) */

exports.mongoose = mongoose;
exports.MongoStore = store;