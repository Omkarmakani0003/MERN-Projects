class apiError extends Error{

     constructor(statusCode=400, message="Something went wrong", data=[], error=null, stack=null){
         super(message)
         this.statusCode = statusCode
         this.success = false
         this.data = data
         this.error = error
         if(!stack){
            Error.captureStackTrace(this,this.constructor)
         }else{
            this.stack = stack
         }
     }
}

module.exports = apiError
