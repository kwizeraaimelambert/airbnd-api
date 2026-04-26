import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export function authenticate(req, res, next) {
    console.log("Authenticating request with headers:", req.headers);
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization header missing or malformed" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.id;
        req.role = payload.role;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}
export function requireHost(req, res, next) {
    if (req.role !== "HOST" && req.role !== "ADMIN") {
        return res.status(403).json({ error: "Host or Admin role required" });
    }
    next();
}
export function requireGuest(req, res, next) {
    if (req.role !== "GUEST" && req.role !== "ADMIN") {
        return res.status(403).json({ error: "Guest or Admin role required" });
    }
    next();
}
export function requireAdmin(req, res, next) {
    if (req.role !== "ADMIN") {
        return res.status(403).json({ error: "Admin role required" });
    }
    next();
}
//# sourceMappingURL=auth.middleware.js.map