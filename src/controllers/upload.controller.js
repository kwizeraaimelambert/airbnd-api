import { uploadToCloudinary } from "../config/cloudinary.js";
import prisma from "../config/prisma.js";
// POST /users/:id/avatar
// Uploads a profile picture for a user
// Multer middleware runs first and puts the file on req.file
// Then we upload the buffer to Cloudinary and save the URL to the database
export async function uploadAvatar(req, res) {
    const id = parseInt(req.params["id"]);
    // req.file is set by Multer — if it's missing, no file was sent
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    // Upload the buffer to Cloudinary under the "airbnb/avatars" folder
    const { url, publicId } = await uploadToCloudinary(req.file.buffer, "airbnb/avatars");
    // Save the Cloudinary URL to the user's record in the database
    const updated = await prisma.user.update({
        where: { id },
        data: { avatar: url },
    });
    res.json({ message: "Avatar uploaded successfully", avatar: url });
}
export async function deleteAvatar(req, res) {
    const id = parseInt(req.params["id"]);
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    // Save the Cloudinary URL to the user's record in the database
    const updated = await prisma.user.update({
        where: { id },
        data: { avatar: null },
    });
    res.json({ message: "Avatar deleted successfully" });
}
//# sourceMappingURL=upload.controller.js.map