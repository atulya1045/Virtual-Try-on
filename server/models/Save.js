import mongoose from "mongoose";

const saveSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,   // We are linking customerId to customer's login Id in the user's collection
        ref: 'User',
        required: true,
    },
    paintId: {
        type: mongoose.Schema.Types.ObjectId,   // We are linking customerId to customer's login Id in the user's collection
        ref: 'Paint',
        required: true,
    },
    path: String,
})
 
export default mongoose.model('Save', saveSchema);