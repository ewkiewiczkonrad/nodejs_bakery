const Cake = require('../models/cake');
const mongoose = require('mongoose');


exports.cake_get = (req,res,next) => {
    Cake.findById(id)
    .select('name price _id')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            cakes: docs.map( doc => {
                return {
                    name:doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/products/' +doc._id
                    }
                };
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.cake_post = (req,res,next) => {
    const cake = new Cake({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    cake.save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
          message: "Created cake successfully",
          createdCake: {
              name: result.name,
              price: result.price,
              _id: result._id,
              request: {
                  type: 'GET',
                  url: "http://localhost:3000/cake/" + result._id
              }
          }
        });
      })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    });
    
}

exports.cake_get_id = (req,res,next) =>{
    const id = req.params.cakeId;
   Cake.findById(id)
   .select('name price _id')
   .exec()
   .then(doc => {
       
       console.log("Database: ", doc);
       if (doc) {
        res.status(200).json({
            cake: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/cake/'
            }
        })
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
}

exports.cake_patch = (req,res,next) =>{
    const id = req.params.cakeId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Cake.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/cake/' + id
            }
        });
      })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.cake_delete= (req, res, next) => {
    const id = req.params.cakeId;
    Cake.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/cake/',
                body: { name: 'String', price: 'Number' }
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }