const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { app } = require('./app');

dotenv.config({
    path: './.env'
});

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("ERR: ", error);
            throw error;
        });

        app.listen(PORT, () => {
            console.log(`⚙️ Server is running at port : ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });
