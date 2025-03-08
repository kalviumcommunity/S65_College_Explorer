const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db.js');
dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));
app.use(cookieParser());

// Route imports
const userRoutes = require('./routes/userRoute.js')
const collegeRoutes = require('./routes/collegeRoutes.js')

// Routes
app.use('/auth', userRoutes)
app.use('/college', collegeRoutes)


// Default route
app.get('/', (req, res) => {
    res.send('API is running....');
});

// Database connection and server start
connectDB()
.then(() => {
    server.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️  Server running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
});