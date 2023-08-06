function invalidCredentialsError(){
    return{
        name: 'InvalidCredentialsError',
        message:"Invalid credentials error"
    }
}
function userNotFound(){
    return{
        name: 'NotFoundError',
        message: 'Unregistered user'
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
        message:"Not found"
    }
}

function conflict(){
    return {
        name: "conflict",
        message: "Conflict"
    }
}

function gameNotFound(){
    return{
        name:"GameNotFound",
        message:"Game not found"
    }
}

export default{
    invalidCredentialsError,
    userNotFound,
    unauthorized,
    incorrectFieldsError,
    duplicatedEmailError,
    notFound,
    conflict,
    gameNotFound
}