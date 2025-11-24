import { Router } from "express";
import CongeCtrl from "../controller/congeController";

export default class CongeRout {
  routes: Router = Router();
  congeCtrl = new CongeCtrl();

  constructor() {
    this.config();
  }

  private config() {
    this.routes.post("/", (req, res) => {
      this.congeCtrl
        .create(req.body)
        .then((conge) =>
          res.status(201).json({ message: "registered", data: conge })
        )
        .catch((err) => res.status(400).json({ error: "could not register" }));
    });

    this.routes.put("/:id", (req, res) => {
      this.congeCtrl
        .update(req.params.id, req.body)
        .then((conge) =>
          res.status(201).json({ message: "updated", data: conge })
        )
        .catch((err) => res.status(400).json({ error: "could not update" }));
    });

    this.routes.get("/", (req, res) => {
      this.congeCtrl
        .getAll()
        .then((conge) =>
          res.status(201).json({ message: "found", data: conge })
        )
        .catch((err) => res.status(400).json({ error: "could not find" }));
    });

    this.routes.get("/:id", (req, res) => {
      this.congeCtrl
        .getOne(req.params.id)
        .then((conge) =>
          res.status(201).json({ message: "found", data: conge })
        )
        .catch((err) => res.status(400).json({ error: "could not find" }));
    });

    this.routes.delete("/:id", (req, res) => {
      this.congeCtrl
        .delete(req.params.id)
        .then((conge) =>
          res.status(201).json({ message: "deleted", data: conge })
        )
        .catch((err) => res.status(400).json({ error: "could not delete" }));
    });
  }
}
