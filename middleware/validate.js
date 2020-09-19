const User = require('../users/userDb');
const Post = require("../posts/postDb")
const validateUserId=()=>{
    return(req,res,next)=>{
        User.getById(req.params.id)
        .then(user=>{
            if (user){
                req.user=user
                next()
            }else{
                res.status(404).json({message:"Error! User does not exist"})
            }
        })
        .catch(next)
    }
}

const validateUser=()=>{
    return(req,res,next)=>{
        if (!req.body || !req.body.name){
            return res.status(404).json({
                message: "missing required name field"
            })
        }
        next()
    }

}

const validatePostId=()=>{
    return(req,res,next)=>{
        Post.getById(req.params.id)
        .then(post=>{
            if (post){
                req.user=post
                next()
            }else{
                res.status(404).json({message:"invalid post"})
            }
        })
        .catch(next)
    }
}

const validatePost=()=>{
    return(req,res,next)=>{
        if (!req.body.text){
            return res.status(400).json({message:"Missing required text field"})

        }
        next()
    }
}
module.exports={
    validateUserId,
    validateUser,
    validatePost,
    validatePostId
}
