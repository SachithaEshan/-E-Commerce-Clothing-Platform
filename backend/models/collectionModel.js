import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
});

const Collection = mongoose.model("Collection", collectionSchema);
export default Collection;
