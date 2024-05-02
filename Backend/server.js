const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const app = require('./app.js');
//const authRouter = require('./routes/authRoutes')
const path = require('path'); // Add this line to require the path module

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Specify the directory where your views are located (optional if it's the default 'views' directory)
app.set('views', path.join(__dirname, 'views'));
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
const mongoose = require('mongoose');
const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
    console.log('Connected to MongoDB');
});

port = 5000 || process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
    process.exit(1);
    });
});