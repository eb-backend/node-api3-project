const express = require('express');
const logger= require("./middleware/logger")
const userRouter=require("./users/userRouter")
const postRouter=require("./posts/postRouter")

const server = express();
server.use(express.json());
// server.use(morgan("combined")) //adds information from the person doing the call request in the console
server.use(logger())
server.use(userRouter)
server.use(postRouter)

//express is going to use this error catching middleware
server.use((err, req,res, next)=>{
  console.log(err)
  res.status(500).json({
    message: "Something went wrong, try again later"
  })

})




// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

server.listen(1333, () => {
  console.log('\n*** server Running on http://localhost:1333 ***\n');
});
