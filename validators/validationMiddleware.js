const { validationResult} =require("express-validator")

validationMiddleware=(req,res,next)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).json({ errors: errors.array() });
    }
   
    next()
  }
module.exports=validationMiddleware