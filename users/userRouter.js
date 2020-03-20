const express = require('express');

const User = require('./userDb.js');

const router = express.Router();

// WORKING
router.post('/',validateUser, (req, res) => {
  // do your magic!
  User.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({ message: "Error adding user", err})
    })
});


//
router.post('/:id/posts', (req, res) => {
  // do your magic!
});


// WORKING
router.get('/', (req, res) => {
  // do your magic!
  User.get(req.query)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "error retrieving the users", err})
    })
});


// WORKING
router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});


// WORKING
router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  User.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json({ posts})
    })
    .catch( err => {
      res.status(500).json({ message: "Error getting the posts of the user", err})
    })
});


// WORKING
router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  User.remove(req.params.id)
    .then(count => {
      if(count > 0) {
        res.status(200).json({ message: "The user has been deleted"});
      } else {
        res.status(400).json({ message: "The user could not be found"})
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error removing the user", err})
    })
});


//
router.put('/:id', [validateUser, validateUserId], (req, res) => {
  // do your magic!
  User.update(req.params.id, req.body)
    .then(user =>  {
      if(user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user could not be found"})
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating the user", err})
    })
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
  }else if (!body.name) {
    res.status(400).json({ message: "missing required name field"});
  } else {
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
