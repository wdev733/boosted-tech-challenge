const express = require('express');
const router = express.Router();

const ConsentController = require('../app/controllers/ConsentController');

router.post('/consent/target', ConsentController.insertTarget);
router.patch('/consent/target/:targetId', ConsentController.updateTarget);
router.get('/consent/target/:targetId', ConsentController.getTargets);
router.get('/consent/target', ConsentController.getTargets);

module.exports = router;