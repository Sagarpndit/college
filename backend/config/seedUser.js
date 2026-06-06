const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const config = require("../config");
const User = require("../src/models/User");

const seedUser = async () => {
    try {
        await mongoose.connect(config.DATABASE_URL);

        const name = "Sagar"
        const mobile = "8340399865";
        const email = "info@gmail.com";
        const existingUser = await User.findOne({ mobile });

        if (existingUser) {
            console.log("User already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("admin@123", 10);

        const user = await User.create({
            name,
            mobile,
            email,
            password: hashedPassword,
            status: 1,
        });

        console.log("User seeded successfully");
        console.log(user);

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("Seed failed:", error);
        await mongoose.disconnect();
        process.exit(1);
    }
};

seedUser();