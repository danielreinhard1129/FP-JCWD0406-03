import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  static as static_,
} from "express";
import cors from "cors";
import { UserRouter } from "./routers/user.router";
import { PORT } from "./config";
import { RoomRouter } from "./routers/room.router";
import { ReviewRouter } from "./routers/review.router";
import { PropertyRouter } from "./routers/property.router";
import { TransactionRouter } from "./routers/transaction.router";
import { join } from "path";

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use("/", static_(join(__dirname, "../public")));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes("/api/")) {
        res.status(404).send("Not found !");
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes("/api/")) {
          console.error("Error : ", err.stack);
          res.status(500).send(err.message);
        } else {
          next();
        }
      }
    );
  }

  private routes(): void {
    const userRouter = new UserRouter();
    const reviewRouter = new ReviewRouter();
    const transactionRouter = new TransactionRouter();
    const propertyRouter = new PropertyRouter();
    const roomRouter = new RoomRouter();
    this.app.get("/api", (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });

    this.app.use("/api/user", userRouter.getRouter());
    this.app.use("/api", propertyRouter.getRouter());
    this.app.use("/api", reviewRouter.getRouter());
    this.app.use("/api", roomRouter.getRouter());

    this.app.use("/api/transaction", transactionRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
