import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import morgan from "morgan";
import { GENERAL_CONFIG, MODULES_LIST } from "./lib/config";
import * as swaggerUI from "swagger-ui-express";
import { checkModules } from "./lib/serverUtils";
import UserRout from "./routes/userRoutes";
import * as swaggerJson from "../build/swagger.json";
import CompanyRout from "./routes/companyRoutes";
import RoleRout from "./routes/roleRoutes";
import CongeRout from "./routes/congeRoutes";
import NotificationRout from "./routes/notificationRoutes";
import DocumentRout from "./routes/documentRoutes";
import PresenceRout from "./routes/presenceRoutes";
import DipeRout from "./routes/dipeRoutes";

class ApiServer {
  private app = express();
  userRts = new UserRout();
  companyRts = new CompanyRout();
  roleRts = new RoleRout();
  congeRts = new CongeRout();
  notificationRts = new NotificationRout();
  dipeRts = new DipeRout();
  presenceRts = new PresenceRout();
  documentRts = new DocumentRout();

  // app urls
  private appUrl = [
    {
      url: "baseUrl",
      value: `${GENERAL_CONFIG.app.baseUrl}:${GENERAL_CONFIG.app.port}`,
    },
  ];

  // server construction
  constructor() {
    this.app.use(morgan("dev"));
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.app.use(bodyParser.json());
    this.app.use(`/api/v${GENERAL_CONFIG.app.version}/health`, (req, res) => {
      res.status(200).json("Up and running");
    });
  }

  // connect base module
  baseModule() {
    this.app.use(
      `/api/v${GENERAL_CONFIG.app.version}/user`,
      this.userRts.routes
    );
    this.app.use(
      `/api/v${GENERAL_CONFIG.app.version}/role`,
      this.roleRts.routes
    );
    this.app.use(
      `/api/v${GENERAL_CONFIG.app.version}/document`,
      this.documentRts.routes
    );
    this.app.use(
      `/api/v${GENERAL_CONFIG.app.version}/notification`,
      this.notificationRts.routes
    );
    this.app.use(
      `/api/v${GENERAL_CONFIG.app.version}/company`,
      this.companyRts.routes
    );
    this.app.use(
      `/api/v${GENERAL_CONFIG.app.version}/conge`,
      this.congeRts.routes
    );
    this.app.use(
      `/api/v${GENERAL_CONFIG.app.version}/dipe`,
      this.dipeRts.routes
    );
    this.app.use(
      `/api/v${GENERAL_CONFIG.app.version}/presence`,
      this.presenceRts.routes
    );
  }

  public start() {
    this.baseModule();

    // server swagger
    this.app.use(
      ["/openapi", "/docs", "/swagger"],
      swaggerUI.serve,
      swaggerUI.setup(swaggerJson)
    );

    // start server
    this.app.listen(GENERAL_CONFIG.app.port, async () => {
      // Server end point
      console.log(`Server is running on port ${GENERAL_CONFIG.app.port}`);

      // server base urls
      console.table(this.appUrl);

      const ModulesState = await checkModules(MODULES_LIST);
      // server modules
      console.table(ModulesState);
    });
  }
}

const apiServer = new ApiServer();
apiServer.start();
