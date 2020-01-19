const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const toBake = require("../models/toBake");
const Cake = require("../models/cake");


router.get("/", (req, res, next) => {
  toBake.find()
    .select("cake quantity _id")
    .populate('cake', 'name')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        tobake: docs.map(doc => {
          return {
            _id: doc._id,
            cake: doc.cake,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/toBake/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  Cake.findById(req.body.cakeId)
    .then(cake => {
      if (!cake) {
        return res.status(404).json({
          message: "Cake not found"
        });
      }
      const tobake = new toBake({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        cake: req.body.cakeId
      });
      return toBake.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdtoBake: {
          _id: result._id,
          cake: result.cake,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/toBake/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:toBakeId", (req, res, next) => {
  toBake.findById(req.params.toBakeId)
  .populate('cake')  
  .exec()
    .then(tobake => {
      if (!tobake) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        tobake: tobake,
        request: {
          type: "GET",
          url: "http://localhost:3000/toBake"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:toBakeId", (req, res, next) => {
  toBake.remove({ _id: req.params.toBakeId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/toBake",
          body: { cakeId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;