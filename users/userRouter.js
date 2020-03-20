const express = require('express');

const User = require('./userDb.js');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
 const { id } = req.params;

 User.getById(id)
  .then(user => {
    if(user) {
      req.user = user;
      next();
    } else {
      next({ message: "user id not found"})
    }
  })
  .catch( err => {
    res.status(500).json({ message: 'failed', err});
  })
};

function validateUser(req, res, next) {
  // do your magic!
  body = req.body;
  if(!body && body === {}) {
    res.status(400).json({ message: "missing user data" })
    next();
  }else if (!body.name) {
    res.status(400).json({ message: "missing required name field"});
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  body = req.body;
  if(!body && body === {}) {
    res.status(400).json({ message: "missing post data" })
    next();
  }else if (!body.text) {
    res.status(400).json({ message: "missing required text field"});
    next();
  }
}

module.exports = router;
