import express, { Request, Response } from "express";
import cors from "cors";
import getBalance from "./getBalance"
const PORT = process.env.PORT || 8000;

const app = express()

app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  const value = await getBalance()
  res.status(200).send(value);
})

app.listen(PORT, ()=>{
  console.log('Server Started at Port, PORT')
})