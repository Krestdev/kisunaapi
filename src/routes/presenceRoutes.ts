import { Router } from "express";
import PresenceCtrl from "../controller/presenceController";

export default class PresenceRout {
  routes: Router = Router();
  presenceCtrl = new PresenceCtrl();

  constructor() {
    this.config();
  }

  private config() {
    this.routes.post("/", (req, res) => {
      this.presenceCtrl
        .create(req.body)
        .then((presence) =>
          res.status(201).json({ message: "registered", data: presence })
        )
        .catch(() => res.status(400).json({ error: "could not register" }));
    });

    this.routes.put("/:id", (req, res) => {
      this.presenceCtrl
        .update(req.params.id, req.body)
        .then((presence) =>
          res.status(201).json({ message: "updated", data: presence })
        )
        .catch(() => res.status(400).json({ error: "could not update" }));
    });

    this.routes.get("/", (req, res) => {
      this.presenceCtrl
        .getAll()
        .then((presence) =>
          res.status(201).json({ message: "found", data: presence })
        )
        .catch(() => res.status(400).json({ error: "could not find" }));
    });

    this.routes.get("/:id", (req, res) => {
      this.presenceCtrl
        .getOne(req.params.id)
        .then((presence) =>
          res.status(201).json({ message: "found", data: presence })
        )
        .catch(() => res.status(400).json({ error: "could not find" }));
    });

    this.routes.delete("/:id", (req, res) => {
      this.presenceCtrl
        .delete(req.params.id)
        .then((presence) =>
          res.status(201).json({ message: "deleted", data: presence })
        )
        .catch(() => res.status(400).json({ error: "could not delete" }));
    });
  }
}
