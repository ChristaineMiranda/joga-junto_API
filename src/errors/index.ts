function invalidCredentialsError(){
    return{
        name: 'InvalidCredentialsError',
        message:"Invalid credentials error"
    }
}
function userNotFound(){
    return{
        name: 'NotFoundError',
        message: 'Not Found'
    }
}

function unauthorized(){
    return{
        name: 'Unauthorized',
        message:'Unauthorized'
    }
}

function incorrectFieldsError(errors: string []){
    return{
        name: 'incorrectFieldsError',
        message: errors
    }
}

function duplicatedEmailError(){
    return{
        name: "DuplicatedEmailError",
        message: "This email is already in use"
    }
}


function notFound(){
    return{
        name:"NotFound",
        message:"Not found!"
    }
}

export default{
    invalidCredentialsError,
    userNotFound,
    unauthorized,
    incorrectFieldsError,
    duplicatedEmailError,
    notFound
}