import { Router } from "express";
import NotificationCtrl from "../controller/notificationController";

export default class NotificationRout {
  routes: Router = Router();
  notificationCtrl = new NotificationCtrl();

  constructor() {
    this.config();
  }

  private config() {
    this.routes.post("/", (req, res) => {
      this.notificationCtrl
        .create(req.body)
        .then((notification) =>
          res.status(201).json({ message: "registered", data: notification })
        )
        .catch(() => res.status(400).json({ error: "could not register" }));
    });

    this.routes.put("/:id", (req, res) => {
      this.notificationCtrl
        .update(req.params.id, req.body)
        .then((notification) =>
          res.status(201).json({ message: "updated", data: notification })
        )
        .catch(() => res.status(400).json({ error: "could not update" }));
    });

    this.routes.get("/", (req, res) => {
      this.notificationCtrl
        .getAll()
        .then((notification) =>
          res.status(201).json({ message: "found", data: notification })
        )
        .catch(() => res.status(400).json({ error: "could not find" }));
    });

    this.routes.get("/:id", (req, res) => {
      this.notificationCtrl
        .getOne(req.params.id)
        .then((notification) =>
          res.status(201).json({ message: "found", data: notification })
        )
        .catch(() => res.status(400).json({ error: "could not find" }));
    });

    this.routes.delete("/:id", (req, res) => {
      this.notificationCtrl
        .delete(req.params.id)
        .then((notification) =>
          res.status(201).json({ message: "deleted", data: notification })
        )
        .catch(() => res.status(400).json({ error: "could not delete" }));
    });
  }
}
