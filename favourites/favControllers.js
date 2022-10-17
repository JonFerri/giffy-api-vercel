import Favourite from './favModel.js';
import jwt from 'jsonwebtoken';
const favControllers = {
    async getFavs(req, res) {
        const user = req.user.nickName;
        const info = await Favourite.find({ userName: user });
        res.send({ info });
    },
    async createFav(req, res) {
        try {
            const fav = {
                userName: req.user.nickName,
                giff: req.body.giff
            };
            const favToSave = new Favourite(fav);
            const favSaved = await favToSave.save();
            res.json({ favSaved });
        }
        catch (error) {
            res.json({ error });
        }
    },
    async deleteFav(req, res) {
        try {
            const id = req.params.id;
            const userName = req.user.nickName;
            const deletedFav = await Favourite.findByIdAndDelete({ _id: id });
            res.json(deletedFav);
        }
        catch (error) {
            console.log(error);
        }
    },
    async deleteAllFavs(req, res) {
        try {
            const deletedFavs = await Favourite.deleteMany();
            res.json(deletedFavs);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
};
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(" ")[1];
    if (token == undefined)
        return res.status(401).json({ error: "Token missing" });
    const secret = process.env.ACCES_TOKEN_SECRET;
    jwt.verify(token, secret, (error, user) => {
        if (error)
            return res.status(403).json({ error });
        req.user = user;
        next();
    });
}
export default favControllers;
