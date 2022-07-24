const fs = require('fs');
const path = require('path')

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require('multer');

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

//returns images statically
app.use('/uploads/images', express.static(path.join('uploads', 'images')))

//handling CORS errors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use("/api/places", placesRoutes); // => /api/places...
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err)
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://anthony:TbSJDF9qoQU1VKDD@cluster0.ksrcssq.mongodb.net/places?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5001);
  })
  .catch((err) => {
    console.log(err);
  });
