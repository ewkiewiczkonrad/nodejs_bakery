const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Bake get'
    });
});

router.post('/', (req, res, next) =>{
    res.status(201).json({
        message: 'Bake post'
    });
});

router.get('/:toBakeId', (req, res, next) =>{
    res.status(200 ).json({
        message: 'Bake detais',
        toBakeId: req.param.toBakeId
    });
});
router.delete('/:toBakeId', (req, res, next) =>{
   res.status(200).json({
        message: 'Bake deleted',
        toBakeId: req.param.toBakeId
    });
});
module.exports = router;