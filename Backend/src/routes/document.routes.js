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
documentRouter.delete("/:id",verifyJWT,docController.deleteDocument)
documentRouter.put("/:id",verifyJWT,docController.updateDocument)
documentRouter.get("/:id/download",verifyJWT,docController.downloadDocument)
export default documentRouter;