import mongoose from "mongoose";

const paintSchema = mongoose.Schema({
    name: String,
    color: String,
    hex: String,
    brand: String,
    code: Number,
    description: String,
    link: String,
    price: Number
});

export default mongoose.model('Paint', paintSchema);