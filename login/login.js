import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../users/userModel.js';
import Favourite from '../favourites/favModel.js';
const loginRouter = Router();
loginRouter.post('/login', async (req, res) => {
    const user = req.body;
    try {
        const userExists = await User.findOne({ nickName: user.nickName });
        //authenticate user
        if (!userExists) {
            return res.status(401).json({ message: "User or password incorrect." });
        }
        const checkPassword = await bcrypt.compare(user.password, userExists.password);
        if (!checkPassword) {
            return res.status(401).json({ message: "User or password incorrect." });
        }
        //In case user authenticates correctly, generate token and send it along the user
        //information, such as list of favourites
        const secret = process.env.ACCES_TOKEN_SECRET;
        const accesToken = jwt.sign(user, secret, { expiresIn: "10h" });
        const userFavs = await Favourite.find({ userName: user.nickName });
        const favs = userFavs.map(userFav => userFav.giff);
        res.send({ accesToken, userName: user.nickName, favs });
    }
    catch (error) {
        console.error(error);
    }
});
export default loginRouter;
