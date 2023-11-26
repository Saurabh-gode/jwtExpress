require('dotenv').config();
require('./config/db').connect();
const { PORT } = process.env;
const express = require('express');
const cors = require('cors');

// app init
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
const userRoutes = require('./src/user/userRoutes');

app.use('/user', userRoutes)


app.listen(PORT, () => {
    console.log('App is initialized')
})
//

