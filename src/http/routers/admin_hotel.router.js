import { Router } from "express";

const router = Router();

router.route("/").get().post().put().delete();

export default router;
