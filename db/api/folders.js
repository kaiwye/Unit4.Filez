import express from "express";
const foldersRouter = express.Router();
export default foldersRouter;

import { getFolders, getFolder } from "#db/queries/folders";
import { getFilesByFolderId, createFile } from "#db/queries/files";

foldersRouter.route("/").get(async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

foldersRouter.param("id", async (req, res, next, id) => {
  if (!/^\d+$/.test(id)) {
    return res.status(400).send("Id must be a positive integer");
  }
  try {
    const folder = await getFolder(id);
    if (!folder) {
      return res.status(404).send("No folder found with associated Id");
    }
    req.folder = folder;
    next();
  } catch (err) {
    next(err);
  }
});

foldersRouter.route("/:id").get(async (req, res, next) => {
  try {
    const files = await getFilesByFolderId(req.folder.id);
    res.send({ ...req.folder, files });
  } catch (err) {
    next(err);
  }
});

foldersRouter
  .route("/:id/files")
  .get(async (req, res, next) => {
    try {
      const files = await getFilesByFolderId(req.folder.id);
      res.send(files);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    if (!req.body) return res.status(400).send("Request body is required");
    try {
      const { name, size } = req.body;
      if (!name || !size) {
        return res.status(400).send("File requires a name and size");
      }
      const newFile = await createFile({ name, size, folderId: req.folder.id });
      res.status(201).send(newFile);
    } catch (err) {
      next(err);
    }
  });
