import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from "cloudinary";

// Add food item
export const addFood = async (req, res) => {
    try {
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.file.path
        });

        await food.save();

        res.json({
            success: true,
            message: "Food Added"
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });
    }
};


// All Food List
export const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});

        res.json({
            success: true,
            data: foods
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });
    }
};


// Remove Food Item
export const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.json({
                success: false,
                message: "Food not found"
            });
        }

        // Delete image from Cloudinary
        if (food.image) {
            const imageUrl = food.image;

            const parts = imageUrl.split("/");
            const filename = parts[parts.length - 1];
            const publicId = `food-delivery/${filename.split(".")[0]}`;

            await cloudinary.uploader.destroy(publicId);
        }

        await foodModel.findByIdAndDelete(req.body.id);

        res.json({
            success: true,
            message: "Food Removed"
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });
    }
};