const express = require("express");
const app = express();
const tasks = require("./routes/tasks-router");
const connectDB  = require("./database/connect");
const incorrectRoute = require('./middleware/incorrectRoute')
const errorHandler = require('./middleware/error-handler')
require('dotenv').config()
//middleware to get access to the json data in the form
app.use(express.json());
// set base routes
app.use("/api/v1/tasks", tasks);
//set the public folders
app.use(express.static("./public"));
//middleware if the route is not correct
app.use(incorrectRoute)
//middleware to use custom error handler
app.use(errorHandler)
const port = process.env.PORT || 7000;

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
      .then(() => {
        app.listen(port, () =>
          console.log(`Server is listening on port ${port}`)
        );
      })
      .catch((error) => console.error("Could not connect..."));
  } catch (error) {
    console.log(error);
  }
};

startApp()
