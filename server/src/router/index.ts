import { Router } from "express";
import chatRouter from './chat.router'
import userChatsRouter from './userchats.router'


const router = Router()

router.use('/chats', chatRouter)
router.use('/userchats', userChatsRouter)

export default router;