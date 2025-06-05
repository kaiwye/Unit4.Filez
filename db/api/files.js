import express from "express";
const filesRouter = express.Router();
export default filesRouter;

import { getFiles } from "#db/queries/files";

filesRouter.route("/").get(async (req, res, next) => {
  try {
    const files = await getFiles();
    res.status(200).send(files);
  } catch (err) {
    next(err);
  }
});
