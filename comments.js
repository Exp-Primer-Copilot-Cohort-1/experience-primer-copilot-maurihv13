// Create web server
var express = require('express');
var router = express.Router();
var db = require('../db');
var ObjectId = require('mongodb').ObjectID;

/* GET comments listing. */
router.get('/', function(req, res, next) {
  db.get().collection('comments').find().toArray(function(err, docs) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
});

// POST comments
router.post('/', function(req, res, next) {
  var comment = {
    text: req.body.text
  };
  db.get().collection('comments').insert(comment, function(err, result) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(comment);
  });
});

// GET comment by id
router.get('/:id', function(req, res, next) {
  db.get().collection('comments').findOne({_id: ObjectId(req.params.id)}, function(err, doc) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  });
});

// PUT comment by id
router.put('/:id', function(req, res, next) {
  db.get().collection('comments').updateOne({_id: ObjectId(req.params.id)}, {$set: {text: req.body.text}}, function(err, result) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

// DELETE comment by id
router.delete('/:id', function(req, res, next) {
  db.get().collection('comments').deleteOne({_id: ObjectId(req.params.id)}, function(err, result) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

module.exports = router;