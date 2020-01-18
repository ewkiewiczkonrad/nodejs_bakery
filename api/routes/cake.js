const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Cake = require('../models/cake');

router.get('/', (req,res,next) => {
    Cake.find().exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req,res,next) => {
    const cake = new Cake({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    cake.save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message:"post request to /cake",
            createdCake: result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    });
    
});

router.get('/:cakeId', (req,res,next) =>{
    const id = req.params.cakeId;
   Cake.findById(id).exec()
   .then(doc => {
       
       console.log("Database: ", doc);
       if(doc){
        res.status(200).json({doc});
    }
       else{
           res.status(404).json({message: "No valid entry found for ID"})
       }
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({error:err});
    }
       );
});


router.patch('/:cakeId', (req,res,next) =>{
    const id = req.params.cakeId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Cake.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
router.delete("/:cakeId", (req, res, next) => {
    const id = req.params.cakeId;
    Cake.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

module.exports = router;