const {user_model} = require("./user_model");
const mongoose = require("mongoose");
function user_sign_up(user){
    return new Promise(async (resolve,reject)=>{
            if(!user) reject("fuck you");
            try {
                console.log(user);
                const new_user = new user_model({username:user.username,email:user.email});
                const test = await new_user.save();
                delete test._v;
                resolve(test);
            
            } catch (err) {
                //grab error object keys
                if(err instanceof mongoose.Error.ValidationError){
                    const errors = err.errors;
                    const keys = Object.keys(errors);
                    
                    const error_response= {
                        count : keys.length,
                        errors: []
                    }
                    for(let k of keys){
                        error_response.errors.push({
                            error : errors[k].message,
                            path: errors[k].path,
                            value : errors[k].value
                        })
                    }
                    reject(error_response);
                }else{
                    //fix 
                    console.log(err);
                }


            }
    })

} 
module.exports = {
    user_sign_up
}