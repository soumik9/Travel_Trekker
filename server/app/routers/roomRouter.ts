import express from 'express'
const router = express.Router();

import auth from '../middleware/auth'
import { ENUM_USER_ROLE } from '../../utils/constants/constants';
import createRoom from '../controllers/room/createRoom';
import getRooms from '../controllers/room/getRooms';

//routes
router.get(
    '/',
    getRooms
);

router.post(
    '/',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    createRoom
);

export default router;