import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { constants } from './api/config/constants.js';

// Import environment variables
import env from './api/config/env.js';

// Import routes
import apiRouters from './api/routes/index.js';

const app = express();
const serverPort = env.SERVER_PORT;

// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(env.DATABASE_URL).then(() => {
    console.log("Connected to the database.");
}).catch((error) => {
    console.log("Could not connect to the database. Exiting now...", error);
    process.exit();
});

// Use parsing middleware
app.use(bodyParser.json());
app.use(cors());

// Routers
app.use(constants.API_PREFIX, apiRouters());

// Starting the server
app.listen(serverPort, () => {
    console.log(`Real Estate APP (RE APP) server is running at ${serverPort}`)
});