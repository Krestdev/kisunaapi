import { Router } from "express";
import DocumentCtrl from "../controller/documentController";

export default class DocumentRout {
  routes: Router = Router();
  documentCtrl = new DocumentCtrl();

  constructor() {
    this.config();
  }

  private config() {
    this.routes.post("/", (req, res) => {
      this.documentCtrl
        .create(req.body)
        .then((document) =>
          res.status(201).json({ message: "registered", data: document })
        )
        .catch((err) => res.status(400).json({ error: "could not register" }));
    });

    this.routes.put("/:id", (req, res) => {
      this.documentCtrl
        .update(req.params.id, req.body)
        .then((document) =>
          res.status(201).json({ message: "updated", data: document })
        )
        .catch((err) => res.status(400).json({ error: "could not update" }));
    });

    this.routes.get("/", (req, res) => {
      this.documentCtrl
        .getAll()
        .then((document) =>
          res.status(201).json({ message: "found", data: document })
        )
        .catch((err) => res.status(400).json({ error: "could not find" }));
    });

    this.routes.get("/:id", (req, res) => {
      this.documentCtrl
        .getOne(req.params.id)
        .then((document) =>
          res.status(201).json({ message: "found", data: document })
        )
        .catch((err) => res.status(400).json({ error: "could not find" }));
    });

    this.routes.delete("/:id", (req, res) => {
      this.documentCtrl
        .delete(req.params.id)
        .then((document) =>
          res.status(201).json({ message: "deleted", data: document })
        )
        .catch((err) => res.status(400).json({ error: "could not delete" }));
    });
  }
}
