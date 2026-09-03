import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import * as famcontroller from '../controller/family.controller.js'

const famRouter = Router();

famRouter.post("/",verifyJWT,famcontroller.addFamilyMember)
famRouter.get("/",verifyJWT,famcontroller.getFamilyMembers)
famRouter.delete("/:id",verifyJWT,famcontroller.deleteFamilyMember)
famRouter.put("/update/:id",verifyJWT,famcontroller.updateFamilyMember)
export default famRouter;