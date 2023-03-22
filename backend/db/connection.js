const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.mongodb, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection is Successful...");
    })
    .catch((e̥rr) => {
      console.log("🚀 ~ file: connection.js:14 ~ connectDB ~ e̥rr:", e̥rr);
      console.log(`Somthing wont wrong...`);
    });
};

module.exports = connectDB;
