import express from "express";
import UserRouter from "./routes/user";
const app = express();
const port = 3001;

app.use(express.json());

app.use("/users", UserRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
