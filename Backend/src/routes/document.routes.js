import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { upload } from "../middleware/upload.middleware.js";
import * as docController from "../controller/document.controller.js";

const documentRouter = Router();

documentRouter.get("/get", verifyJWT,docController.getMyDocuments);
documentRouter.post("/upload",verifyJWT,
  upload.single("file"),
  docController.uploadDocument
);
documentRouter.get("/:id/view",verifyJWT,docController.viewDocument)
export default documentRouter;