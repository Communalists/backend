import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { User } from "../types/prisma-schema";

const UserRouter = Router();

const prisma = new PrismaClient();

UserRouter.get("/all", async (req, res) => {
  const allUsers = await prisma.user.findMany();

  res.json({
    users: allUsers,
  });
});

UserRouter.post("/create", async (req, res, next) => {
  const { name, email } = req.body as User;

  if (!name) {
    res.status(400).send({
      message: "Name wasn't provided!",
    });

    return;
  }

  if (!email) {
    res.status(400).send({
      message: "Email wasn't provided!",
    });

    return;
  }

  await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  res.status(200).send();
});

export default UserRouter;
