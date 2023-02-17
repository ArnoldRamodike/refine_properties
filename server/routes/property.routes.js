import express from 'express';

import { createProperty, deleteProperty, updatePropert, getPropertyDetails,getAllProperties } from '../controllers/property.controller.js';

const router = express.Router();

router.route('/').get(getAllProperties);
router.route('/:id').get(getPropertyDetails);
router.route('/').post(createProperty);
router.route('/:id').patch(updatePropert);
router.route('/:id').delete(deleteProperty);

export default router;