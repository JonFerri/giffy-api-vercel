import { Router } from "express";
import favControllers, { authenticateToken } from "./favControllers.js";
const favRouter = Router();
favRouter.post("/createFav", authenticateToken, favControllers.createFav);
favRouter.get("/getFavs", authenticateToken, favControllers.getFavs);
favRouter.delete("/deleteAllFavs", favControllers.deleteAllFavs);
favRouter.delete("/deleteUserFav/:id", authenticateToken, favControllers.deleteFav);
export default favRouter;
