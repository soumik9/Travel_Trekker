import express from 'express'
const router = express.Router();

import auth from '../middleware/auth'
import { ENUM_USER_ROLE } from '../../utils/constants/constants';
import getFaqs from '../controllers/faq/getFaqs';
import getFaq from '../controllers/faq/getFaq';
import createFaq from '../controllers/faq/createFaq';
import updateFaq from '../controllers/faq/updateFaq';
import deleteFaq from '../controllers/faq/deleteFaq';

//routes
router.get(
    '/',
    getFaqs
);

router.get(
    '/:faqId',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    getFaq
);

router.post(
    '/',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    createFaq
);

router.patch(
    '/:faqId',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    updateFaq
);

router.delete(
    '/:faqId',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    deleteFaq
);

export default router;