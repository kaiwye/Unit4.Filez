import express from "express";
const router = express.Router();
export default router;

import { getFiles } from "#db/queries/files";

router.route("/").get(async (req, res, next) => {
  try {
    const files = await getFiles();
    res.status(200).send(files);
  } catch (err) {
    next(err);
  }
});
