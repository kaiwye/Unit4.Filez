import express from "express";
const app = express();
export default app;
import foldersRouter from "#db/api/folders";
import filesRouter from "#db/api/files";

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Filez!");
});

app.use("/folders", foldersRouter);
app.use("/files", filesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry, something went wrong :(");
});
