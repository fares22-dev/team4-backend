const express = require('express');
const app = express();
const cors=require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./db/connect');
require('dotenv').config();

const port = 3030;

app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (if needed)
  }));

// Include authentication routes
app.use('/api/authRoutes', authRoutes);

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
app.listen(port,console.log(`server is listening on port ${port}`));

    } catch (error) {
        console.log(error)
    }
};
start();
