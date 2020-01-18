const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    res.status(200).json({
        message:"Get request to /cake"
    })
});

router.post('/', (req,res,next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message:"post request to /cake",
        createdProduct: product
    })
});

router.get('/:cakeId', (req,res,next) =>{
    const id = req.params.cakeId;
    if (id === 'special'){
        res.status(200).json({
            message: 'Special ID',
            id: id
        });
        
    }else {
        res.status(200).json({
            message: "passed an ID"
        });
    }
});


router.patch('/:cakeId', (req,res,next) =>{
    res.status(200).json({
        message: 'Updated cake!'
    });
    
});
router.delete('/:cakeId', (req,res,next) =>{
    res.status(200).json({
        message: 'Deleted cake!'
    });
});

module.exports = router;