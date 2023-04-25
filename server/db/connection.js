const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const username = encodeURIComponent(process.env.MONGO_DB_USER);
const password = encodeURIComponent(process.env.MONGO_DB_PASS);
const mongoDBURL = `mongodb+srv://${username}:<password>@cluster0.mug6fr1.mongodb.net/?retryWrites=true&w=majority`;
const mongoDBURL_priv = `mongodb+srv://${username}:${password}@cluster0.mug6fr1.mongodb.net/?retryWrites=true&w=majority`;

console.log(process.env.NODE_ENV);

mongoose
  .connect(mongoDBURL_priv, {
    dbName: process.env.NODE_ENV === 'development' ?  process.env.MONGO_DEV_DB_NAME : process.env.MONGO_DB_NAME,
    /* ssl: true,
    sslValidate: true,
    sslCA: `${__dirname}/rootCA.pem`,
    authMechanism: 'MONGODB-X509' */
  })
  .then(() => console.log(`Connected to MongoDB at ${mongoDBURL}`))
  .catch((err) => {console.log(err); process.exit(1);});

mongoose.connection
  .on("close", () => console.log(`Closed connection to ${mongoDBURL}`))
module.exports = mongoose;