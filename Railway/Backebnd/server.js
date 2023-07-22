const app = require("./app");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


app.use(bodyParser.json());

dotenv.config({ path: "./variable.env" });

mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(" Database Connected To MongoDB");

    // Start the server-->
    const port =process.env.PORT;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

