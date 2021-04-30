const express = require('express');
const app = express();
const cors = require('cors');
const db_model = require('./db_model');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.listen(process.env.SERVER_PORT, () => {
    console.log('server started at port 5000');
});