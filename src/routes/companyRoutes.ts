import { Router } from "express";
import CompanyCtrl from "../controller/companyController";

export default class CompanyRout {
  routes: Router = Router();
  companyCtrl = new CompanyCtrl();

  constructor() {
    this.config();
  }

  private config() {
    this.routes.post("/", (req, res) => {
      this.companyCtrl
        .create(req.body)
        .then((company) =>
          res.status(201).json({ message: "registered", data: company })
        )
        .catch((err) => res.status(400).json({ error: "could not register" }));
    });

    this.routes.put("/:id", (req, res) => {
      this.companyCtrl
        .update(req.params.id, req.body)
        .then((company) =>
          res.status(201).json({ message: "updated", data: company })
        )
        .catch((err) => res.status(400).json({ error: "could not update" }));
    });

    this.routes.get("/", (req, res) => {
      this.companyCtrl
        .getAll()
        .then((company) =>
          res.status(201).json({ message: "found", data: company })
        )
        .catch((err) => res.status(400).json({ error: "could not find" }));
    });

    this.routes.get("/:id", (req, res) => {
      this.companyCtrl
        .getOne(req.params.id)
        .then((company) =>
          res.status(201).json({ message: "found", data: company })
        )
        .catch((err) => res.status(400).json({ error: "could not find" }));
    });

    this.routes.delete("/:id", (req, res) => {
      this.companyCtrl
        .delete(req.params.id)
        .then((company) =>
          res.status(201).json({ message: "deleted", data: company })
        )
        .catch((err) => res.status(400).json({ error: "could not delete" }));
    });
  }
}
