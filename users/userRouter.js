const express = require('express');
const User = require('./userDb');
const Post = require('../posts/postDb');
const { validateUserId, validateUser, validatePost, validatePostId} = require("../middleware/validate");


const router = express.Router();

router.post('/', validateUser(), (req, res) => {
  // do your magic!
  User.insert(req.body)
  .then(user=>{
    res.status(201).json(user)
  })
  .catch(err=>next(err))

});

router.post('/:id/posts', validatePost(), validateUserId(), (req, res) => {
  // do your magic!

  const postInfo = { ...req.body, user_id: req.params.id };

  Post.insert(postInfo)
  .then(post => {
    res.status(210).json(post);
  })
  .catch(err=>next(err));
});

router.get('/', (req, res) => {
  // do your magic!
  User.get(req.query)
  .then(user=>{
    res.status(200).json(user)
  })
  .catch(err=>nex(err))
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validatePostId(), (req, res) => {
  // do your magic!
  console.log(req.user)

  res.status(200).json(req.user)
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
  User.remove(req.params.id)
  .then(count=>{
    if (count>0){
      res.status(200).json({ message: 'The user has been nuked' });
    }
    else{
      res.status(404).json({ message: 'Could not find user' });

    }
  })
  .catch(err=>next(err))
});

router.put('/:id', validateUser(),validateUserId(), (req, res) => {
  // do your magic!
  console.log("req-->", req)
  User.update(req.params.id, req.body)
  .then((user)=>{
    if(user){
      res.status(200).json(user)
    }else{
      res.status(404).json({message: "the user could not be found"})
    }
  })
  .catch(err=>next(next))
});

//custom middleware

module.exports = router;
