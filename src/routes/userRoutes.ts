import { Router } from "express";
import UserCtrl from "../controller/userController";

export default class UserRout {
  routes: Router = Router();
  userCtrl = new UserCtrl();

  constructor() {
    this.config();
  }

  private config() {
    this.routes.post("/", (req, res) => {
      this.userCtrl
        .create(req.body)
        .then((user) =>
          res.status(201).json({ message: "registered", data: user })
        )
        .catch((err) => res.status(400).json({ error: "could not register" }));
    });

    this.routes.put("/:id", (req, res) => {
      this.userCtrl
        .update(req.params.id, req.body)
        .then((user) =>
          res.status(201).json({ message: "updated", data: user })
        )
        .catch((err) => res.status(400).json({ error: "could not update" }));
    });

    this.routes.get("/", (req, res) => {
      this.userCtrl
        .getAll()
        .then((user) => res.status(201).json({ message: "found", data: user }))
        .catch((err) => res.status(400).json({ error: "could not find" }));
    });

    this.routes.get("/:id", (req, res) => {
      this.userCtrl
        .getOne(req.params.id)
        .then((user) => res.status(201).json({ message: "found", data: user }))
        .catch((err) => res.status(400).json({ error: "could not find" }));
    });

    this.routes.delete("/:id", (req, res) => {
      this.userCtrl
        .delete(req.params.id)
        .then((user) =>
          res.status(201).json({ message: "deleted", data: user })
        )
        .catch((err) => res.status(400).json({ error: "could not delete" }));
    });
  }
}
