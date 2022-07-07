import express from "express";
import { client } from "../index.js";

const router = express.Router();

router.get("/", async (request, response) => {
  console.log(request.query);

  const users = await client
    .db("restapi")
    .collection("user")
    .find({})
    .toArray();

  response.send(users);
});

router.get("/:id", async (request, response) => {
  console.log(request.params);
  const { id } = request.params;

  const user = await client
    .db("restapi")
    .collection("user")
    .findOne({ id: id });

  user
    ? response.send(user)
    : response.status(404).send({ message: "No User Found" });
});

export const PersonRouter = router;
