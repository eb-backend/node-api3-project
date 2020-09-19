const User = require('./userDb');
const validateUserId=()=>{
    return(req,res,next)=>{
        User.getById(req.params.id)
        .then(user=>{
            if (user){
                req.user=user
                next()
            }else{
                res.status(404).json({message:"invalid user"})
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
    }

}

const validatePost=()=>{
    return(req,res,next)=>{
        if (!req.body.text){
            return res.status(400).json({message:"Missing required text field"})

        }
    }
}
module.exports={
    validateUserId,
    validateUser,
    validatePost
}
