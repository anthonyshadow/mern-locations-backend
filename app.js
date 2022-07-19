const express = require('express');
const bodyParser = require('body-parser')

const placesRoutes = require('./routes/places-route')
const userRoutes = require('./routes/users-routes')

const app = express();

app.use('/api/places/', placesRoutes); // => /api/places/...
app.use('/api/users/', userRoutes) // => /api/users/...

app.listen(5001);