import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";

const UserRouter = Router();

const prisma = new PrismaClient();

UserRouter.get("/all", async (req, res) => {
  const allUsers = await prisma.user.findMany();

  res.json({
    users: allUsers,
  });
});

UserRouter.post("/create", async (req, res) => {
  const { name, email } = req.body as User;

  console.table({ name, email });

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
  })
    .then(() => {
      console.log("SUCCESS");
      res.status(200).send();
    })
    .catch(() => {
      console.error("ERROR");
      res.status(500).send();
    });
});

export default UserRouter;
