const {user_model} = require("./user_model");
function user_sign_up(user){
    return new Promise(async (resolve,reject)=>{
            try {
                const user = new user_model({username : "pepe"});
                const test = await user.save();
                console.log(test);
                resolve(test);
/*                 socket.write(JSON.stringify({
                    type : "test-response",
                    data: {msg : "ack"},
                    error: false,
                })) */
            } catch (err) {
                //grab error object keys
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

            }
    })

} 
module.exports = {
    user_sign_up
}