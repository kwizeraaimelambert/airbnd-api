import type {Request,Response} from "express";
import {users, type User} from "../models/users.model.js"
import type { error } from "node:console";

export function getAllUsers(req:Request,res:Response){
    res.json(users)
}
export function getUserById(req:Request,res:Response){
    const id = parseInt(req.params.id as string);
    const user = users.find(u => u.id === id);
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.json(user);
}
export function createUser(req:Request,res:Response){
    const {name,email,username,phone,role,avatarUrl,bio} = req.body as User;
   if(!name || !email || !username || !phone || !role || !avatarUrl || !bio){
    return res.status(400).json({error:"Missing required fields"});
   }
   const newUser:User = {
    id: users.length + 1,
    name,
    email,
    username,
    phone,
    role,
    avatarUrl,
    bio};
    users.push(newUser);
    res.status(201).json(newUser);
}
export function updateUser(req:Request,res:Response){
    const id = parseInt(req.params.id as string);
    const userIndex = users.findIndex(u => u.id === id);    
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }
    users[userIndex] = { ...users[userIndex], ...req.body }as User;
    res.json(users[userIndex]);
}
export function deleteUser(req:Request,res:Response){
    const id = parseInt(req.params.id as string);
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }
    users.splice(userIndex, 1);
    res.status(200).json({ message: "User deleted successfully" });
}