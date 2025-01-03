import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinaryConfig.js';

// Set up Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'product-pictures',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
    },
});

const upload = multer({ storage });

const cloudinaryUploadMiddleware = (req, res, next) => {
    try {
        console.log("ethii");
        console.log(req.file ? "yes" : "noo")// This should print, confirming the function is being called.

        upload.single('image')(req, res, (err) => {
            if (err) {
                console.error("Error uploading image:", err); // Log the error for better understanding.
                return res.status(500).json({ message: 'Error uploading image', error: err.message });
            }

            // If file is successfully uploaded, log the file path to debug
            console.log("imgUrl", req.file?.path);
            req.imageUrl = req.file?.path;
            next();
        });
    } catch (error) {
        console.log("Err", error);

    }

};

export default cloudinaryUploadMiddleware;
