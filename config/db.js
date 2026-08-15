import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://maazalam00_db_user:Ucodc6kxadUJCVFN@cluster0.gabejit.mongodb.net/food-del').then(() => console.log("DB Connected"))
}