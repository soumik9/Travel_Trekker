import express from 'express'
const router = express.Router();

import auth from '../middleware/auth'
import { ENUM_USER_ROLE } from '../../utils/constants/constants';
import CreateReview from '../controllers/review/CreateReview';
import GetReviews from '../controllers/review/GetReviews';

//routes
router.get(
    '/',
    GetReviews
);

router.post(
    '/',
    auth(ENUM_USER_ROLE.USER),
    CreateReview
);

export default router;