const mongoose = require('mongoose');

/**
 * @description Connects to MongoDB using the URI provided in environment variables
 */
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/RealJanNetra`);
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection FAILED ", error);
        process.exit(1);
    }
}

module.exports = connectDB;
