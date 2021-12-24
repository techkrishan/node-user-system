import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

// Import environment variables
import env from './api/config/env.js';

// Import routes
import routes from './api/routes/index.js';

const app = express();
const router = express.Router();
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
routes(app, router);


// Starting the server
app.listen(serverPort, () => {
    console.log(`Real Estate APP (RE APP) server is running at ${serverPort}`)
});