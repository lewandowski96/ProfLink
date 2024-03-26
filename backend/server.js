require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
// import routes
const profileRoutes = require("./routes/profiles");
const userRoutes = require("./routes/user");

const app = express();

// defining a middleware to handle the requets. need to have this before the routes.
// first the request is received to middleware and then to the actual routes.

// this will enable us to access the request body
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  // we need to call next in order to proceed with the application.
  next();
});


// defining the routes
app.get("/health-check", (req, res) => {
  res.json({ msg: "Backend is up and running..." });
});

app.use("/api/profiles", profileRoutes);
app.use("/api/user", userRoutes);

// connect the database. this is async method. will take a little time to connect
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // make the app listen to port 4000 for requests from frontend only after the db connection is done
    app.listen(process.env.PORT, () => {
      console.log(
        "Database connection success. Listening on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log("Database Connection Error : ", error);
  });
