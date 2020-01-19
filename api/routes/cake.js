const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const cakeController = require('../controllers/cake');


router.get('/', cakeController.cake_get);

router.post('/',checkAuth, cakeController.cake_post);

router.get('/:cakeId', cakeController.cake_get_id);


router.patch('/:cakeId',checkAuth, cakeController.cake_patch);
router.delete("/:cakeId",checkAuth, cakeController.cake_delete);

module.exports = router;