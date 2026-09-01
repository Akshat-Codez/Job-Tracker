const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in .env");
        }

        await mongoose.connect(mongoUri);
        console.log("MongoDB Connected");

        try {
            await mongoose.connection.collection("users").dropIndex("username_1");
        } catch (e) {
            // Index username_1 already dropped or doesn't exist
        }
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
};

module.exports = connectDB;
