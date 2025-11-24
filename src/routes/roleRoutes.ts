import { Router } from "express";
import RoleCtrl from "../controller/roleController";

export default class RoleRout {
  routes: Router = Router();
  roleCtrl = new RoleCtrl();

  constructor() {
    this.config();
  }

  private config() {
    this.routes.post("/", (req, res) => {
      this.roleCtrl
        .create(req.body)
        .then((role) =>
          res.status(201).json({ message: "registered", data: role })
        )
        .catch((err) => res.status(400).json({ error: "could not register" }));
    });

    this.routes.put("/:id", (req, res) => {
      this.roleCtrl
        .update(req.params.id, req.body)
        .then((role) =>
          res.status(201).json({ message: "updated", data: role })
        )
        .catch((err) => res.status(400).json({ error: "could not update" }));
    });

    this.routes.get("/", (req, res) => {
      this.roleCtrl
        .getAll()
        .then((role) => res.status(201).json({ message: "found", data: role }))
        .catch((err) => res.status(400).json({ error: "could not find" }));
    });

    this.routes.get("/:id", (req, res) => {
      this.roleCtrl
        .getOne(req.params.id)
        .then((role) => res.status(201).json({ message: "found", data: role }))
        .catch((err) => res.status(400).json({ error: "could not find" }));
    });

    this.routes.delete("/:id", (req, res) => {
      this.roleCtrl
        .delete(req.params.id)
        .then((role) =>
          res.status(201).json({ message: "deleted", data: role })
        )
        .catch((err) => res.status(400).json({ error: "could not delete" }));
    });
  }
}
