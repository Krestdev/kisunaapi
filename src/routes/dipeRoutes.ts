import { Router } from "express";
import DipeCtrl from "../controller/dipeController";

export default class DipeRout {
  routes: Router = Router();
  dipeCtrl = new DipeCtrl();

  constructor() {
    this.config();
  }

  private config() {
    this.routes.post("/", (req, res) => {
      this.dipeCtrl
        .create(req.body)
        .then((dipe) =>
          res.status(201).json({ message: "registered", data: dipe })
        )
        .catch(() => res.status(400).json({ error: "could not register" }));
    });

    this.routes.put("/:id", (req, res) => {
      this.dipeCtrl
        .update(req.params.id, req.body)
        .then((dipe) =>
          res.status(201).json({ message: "updated", data: dipe })
        )
        .catch(() => res.status(400).json({ error: "could not update" }));
    });

    this.routes.get("/", (req, res) => {
      this.dipeCtrl
        .getAll()
        .then((dipe) => res.status(201).json({ message: "found", data: dipe }))
        .catch(() => res.status(400).json({ error: "could not find" }));
    });

    this.routes.get("/:id", (req, res) => {
      this.dipeCtrl
        .getOne(req.params.id)
        .then((dipe) => res.status(201).json({ message: "found", data: dipe }))
        .catch(() => res.status(400).json({ error: "could not find" }));
    });

    this.routes.delete("/:id", (req, res) => {
      this.dipeCtrl
        .delete(req.params.id)
        .then((dipe) =>
          res.status(201).json({ message: "deleted", data: dipe })
        )
        .catch(() => res.status(400).json({ error: "could not delete" }));
    });
  }
}
