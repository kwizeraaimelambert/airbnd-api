import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../config/email.js";
import { passwordResetEmail, welcomeEmail } from "../templates/emails.js";
import crypto from "crypto";
export async function register(req, res) {
    const { name, email, username, phone, password, role } = req.body;
    if (!name || !email || !username || !phone || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters" });
    }
    const existing = await prisma.user.findFirst({
        where: { OR: [{ email }, { username }] },
    });
    if (existing) {
        return res.status(409).json({ error: "Email or username already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { name: name, email: email, username: username, phone: phone, password: hashedPassword, role: role ?? "GUEST" },
    });
    const { password: _, ...userWithoutPassword } = user;
    await sendEmail(email, "Welcome to Airbnb!", welcomeEmail(name));
    res.status(201).json(userWithoutPassword);
}
export async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
}
export async function getMe(req, res) {
    const user = await prisma.user.findUnique({
        where: { id: req.userId },
        include: {
            // If HOST — include their listings
            // If GUEST — include their bookings
            listings: req.role === "HOST",
        },
    });
    if (!user)
        return res.status(404).json({ error: "User not found" });
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
}
export async function changePassword(req, res) {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: "currentPassword and newPassword are required" });
    }
    if (newPassword.length < 8) {
        return res.status(400).json({ error: "New password must be at least 8 characters" });
    }
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user)
        return res.status(404).json({ error: "User not found" });
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: "Current password is incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
        where: { id: req.userId },
        data: { password: hashedPassword },
    });
    res.json({ message: "Password changed successfully" });
}
export async function forgotPassword(req, res) {
    const { email } = req.body;
    // Always return the same response — don't reveal if the email is registered
    const successResponse = { message: "Reset link was sent to your email ${email}" };
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        return res.json(successResponse);
    // Generate a raw random token — this goes in the email link
    const rawToken = crypto.randomBytes(32).toString("hex");
    // Hash before storing — if DB is compromised, raw tokens are not exposed
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    await prisma.user.update({
        where: { id: user.id },
        data: {
            resetToken: hashedToken,
            restTokenExpiry: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
        },
    });
    await sendEmail(email, "Password Reset email from Airbnb", passwordResetEmail(user.name, `http://localhost:3000/auth/reset-password/${rawToken}`));
    // In a real app: send email with link containing rawToken
    // e.g. http://localhost:3000/auth/reset-password/<rawToken>
    console.log(`Reset token for ${email}: ${rawToken}`);
    res.json(successResponse);
}
export async function resetPassword(req, res) {
    const { token } = req.params;
    const { password } = req.body;
    if (!password || password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters" });
    }
    // Hash the raw token from the URL to compare against the stored hash
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await prisma.user.findFirst({
        where: {
            resetToken: hashedToken,
            restTokenExpiry: { gt: new Date() }, // token must not be expired
        },
    });
    // Same error for both invalid token and expired token — don't reveal which
    if (!user) {
        return res.status(400).json({ error: "Invalid or expired reset token" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            resetToken: null, // clear token after use — one-time use only
            restTokenExpiry: null,
        },
    });
    res.json({ message: "Password reset successfully" });
}
//# sourceMappingURL=auth.controller.js.map