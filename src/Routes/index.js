import { Router } from "express"
import Controller from '../Controller/index.js'

const router = Router()

const controller = new Controller()

router.get("/schedule/", controller.index)
router.post("/schedule/", controller.store)
router.get("/schedule/:id", controller.getOne)
router.delete("/schedule/:id", controller.remove)
router.put("/schedule/:id", controller.update)

export default router
