import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import url from 'url';
import dotenv from 'dotenv';
import userRouter from './users/userRouter.js';
import loginRouter from './login/login.js';
import favRouter from './favourites/favRouter.js';
import User from './users/userModel.js';
dotenv.config();
const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
//App
const app = express();
//Server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//Database
const connection = process.env.DB_CONNECTION;
mongoose.connect(connection, () => {
    console.log("connected to the database");
});
//middleware
app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Wellcome to the homePage");
});
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (error) {
        console.log(error);
    }
});
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/favs", favRouter);
