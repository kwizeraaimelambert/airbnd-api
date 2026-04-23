import { users } from "../models/users.model.js";
export function getAllUsers(req, res) {
    res.json(users);
}
export function getUserById(req, res) {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.json(user);
}
export function createUser(req, res) {
    const { name, email, username, phone, role, avatarUrl, bio } = req.body;
    if (!name || !email || !username || !phone || !role || !avatarUrl || !bio) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const newUser = {
        id: users.length + 1,
        name,
        email,
        username,
        phone,
        role,
        avatarUrl,
        bio
    };
    users.push(newUser);
    res.status(201).json(newUser);
}
export function updateUser(req, res) {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json(users[userIndex]);
}
export function deleteUser(req, res) {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }
    users.splice(userIndex, 1);
    res.status(200).json({ message: "User deleted successfully" });
}
//# sourceMappingURL=users.controller.js.map