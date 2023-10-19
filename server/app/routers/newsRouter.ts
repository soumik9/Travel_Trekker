import express from 'express'
const router = express.Router();

// middleware
import auth from '../middleware/auth'
import { ENUM_USER_ROLE } from '../../utils/constants/constants';
import GetNews from '../controllers/news/GetNews';
import CreateNews from '../controllers/news/CreateNews';
import DeleteNews from '../controllers/news/DeleteNews';

//routes
router.get(
    '/',
    GetNews
);

router.post(
    '/',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    CreateNews
);

router.delete(
    '/:newsId',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    DeleteNews
);

export default router;