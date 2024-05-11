require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// import routes
const businessRoutes = require("./routes/business.routes");

const checkAuth = require("./middleware/checkAuth.js");

const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const { fileURLToPath } = require("url");

// configure filename and dirname because of type specification in package json
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// import routes
const profileRoutes = require("./routes/profiles");
const authRoutes = require("./routes/auth");
const generalUserRoutes = require("./routes/generalUsers");
const courseRoutes = require("./routes/courses");
const rideShareRoutes = require("./routes/rideshare.js");
const postJobs = require("./routes/postJobs");

const app = express();

// defining a middleware to handle the requets. need to have this before the routes.
// first the request is received to middleware and then to the actual routes.

// this will enable us to access the request body
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// to store images locally
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use((req, res, next) => {
  console.log(req.path, req.method);
  // we need to call next in order to proceed with the application.
  next();
});

// defining the routes
app.get("/health-check", (req, res) => {
  res.json({ msg: "Backend is up and running..." });
});

app.use("/api/auth", authRoutes);

app.use("/api/profiles", profileRoutes);

app.use("/api/users/general", generalUserRoutes);
app.use("/api/courses", courseRoutes);

app.use("/api/rideSharing", rideShareRoutes);
app.use("/api/business", businessRoutes);

app.use("/api/post", postJobs);

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
