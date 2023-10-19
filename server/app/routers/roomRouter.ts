import express from 'express'
const router = express.Router();

import auth from '../middleware/auth'
import { ENUM_USER_ROLE } from '../../utils/constants/constants';
import createRoom from '../controllers/room/createRoom';
import getRooms from '../controllers/room/getRooms';
import updateRoom from '../controllers/room/updateRoom';
import getRoom from '../controllers/room/getRoom';
import deleteRoom from '../controllers/room/deleteRoom';
import validateRequest from '../middleware/validateRequest';
import { RoomValidation } from '../validations/roomValidation';

//routes
router.get(
    '/',
    getRooms
);

router.get(
    '/:roomId',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    getRoom
);

router.post(
    '/',
    validateRequest(RoomValidation.createRoomZodSchema),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    createRoom
);

router.patch(
    '/:roomId',
    validateRequest(RoomValidation.updateRoomZodSchema),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    updateRoom
);

router.delete(
    '/:roomId',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    deleteRoom
);

export default router;