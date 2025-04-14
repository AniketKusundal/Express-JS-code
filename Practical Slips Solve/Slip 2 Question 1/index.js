// Write Node JS program to create a User Login System. If username and password is 
// the same then display message is “login successfully” otherwise throw error message 
// “login fail” using then and catch method.


const readLine = require('readline')



const rl = readLine.createInterface({
        input:process.stdin,
        output:process.stdout
})



// Check Password and username is same or not
function checkLogin(username , password) {
    return new Promise((resolve , reject)=>{
        if (username === password) {
            resolve("Login Successfully")
        }
        else
        {
            reject("Username and password is not same")
        }
    })
}



// take a input from the user

rl.question("Enter Username : " , (user)=>{
    rl.question("Enter password : " , (pass)=>{
        checkLogin(user , pass)
        .then((msg)=>{
            console.log(msg);
            rl.close()
        })

        .catch((err)=>{
            console.log(err);
            rl.close()
        })
    })
})