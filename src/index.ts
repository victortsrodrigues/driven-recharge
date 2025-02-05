import express, { json, Request, Response } from "express";
import cors from "cors";
import phonesRouter from "routers/phonesRouter";
import dotenv from "dotenv";
import rechargesRouter from "routers/rechargesRouter";
import summaryRouter from "routers/summaryRouter";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("I'm OK!");
});

app.use(phonesRouter);
app.use(rechargesRouter);
app.use(summaryRouter);

const port: number = Number(process.env.PORT) || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
