import mongoose from 'mongoose';
const { model, Schema } = mongoose;
const GiffSchema = new Schema({
    title: String,
    id: String,
    url: String,
    height: Number,
    width: Number
});
const FavouriteSchema = new Schema({
    userName: String,
    giff: GiffSchema
});
const Favourite = model("Favourite", FavouriteSchema);
export default Favourite;
