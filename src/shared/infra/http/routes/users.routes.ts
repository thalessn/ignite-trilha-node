import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUseController";
import { UpdateAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUsersController = new CreateUserController();
const updateUserAvatarController = new UpdateAvatarController();

usersRoutes.post("/", createUsersController.handle);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };
