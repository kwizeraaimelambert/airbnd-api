import type { Request, Response } from "express";
import prisma from "../config/prisma.js";

export async function getAllUsers(req: Request, res: Response) {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
}

export async function getUserById(req: Request, res: Response) {
  const id = parseInt(req.params.id as string);
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(user);
}

export async function createUser(req: Request, res: Response) {
  const { name, email, username, phone, role, avatar, bio } = req.body;

  if (!name || !email || !username || !phone) {
    return res.status(400).json({ error: "Missing required fields: name, email, username, phone" });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        username,
        phone,
        ...(role && { role }),
        ...(avatar && { avatar }),
        ...(bio && { bio }),
      },
    });

    return res.status(201).json(newUser);
  } catch (err) {
  if (isDuplicateError(err)) {
    const target = (err as { meta?: { target?: string[] } }).meta?.target;
    const field = target?.[0] ?? "field";
    return res.status(409).json({ error: `${field} is already taken` });
  }
  throw err;
}
}

export async function updateUser(req: Request, res: Response) {
  const id = parseInt(req.params.id as string);

  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "User not found" });
  }

  const { name, email, username, phone, role, avatar, bio } = req.body;

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(username && { username }),
        ...(phone && { phone }),
        ...(role && { role }),
        ...(avatar !== undefined && { avatar }),
        ...(bio !== undefined && { bio }),
      },
    });

    return res.json(updated);
  } catch (err) {
  if (isDuplicateError(err)) {
    const target = (err as { meta?: { target?: string[] } }).meta?.target;
    const field = target?.[0] ?? "field";
    return res.status(409).json({ error: `${field} is already taken` });
  }
  throw err;
}
}

export async function deleteUser(req: Request, res: Response) {
  const id = parseInt(req.params.id as string);

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  await prisma.user.delete({ where: { id } });
  return res.status(200).json({ message: "User deleted successfully" });
}
function isDuplicateError(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code: string }).code === "P2002"
  );
}