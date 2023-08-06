import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';
import userRepositories from '../repositories/userRepositories.js';
import errors from '../errors/index.js';


async function createUser(name:string, email: string, password: string, foto:string) {

    const emailExists = await userRepositories.findByEmail(email);
    if(emailExists) throw errors.duplicatedEmailError();
    
    const passwordHash = bcrypt.hashSync(password, 10);
    await userRepositories.createUser(name, email, passwordHash, foto);
}

async function signIn(email:string, password:string) {
    const userExists = await userRepositories.findByEmail(email);
    
    if(!userExists){
        throw errors.userNotFound();
    }
    const validPassword = await bcrypt.compare(password, userExists.password)
    if(!validPassword){
        throw errors.invalidCredentialsError();
    }

    const session = await userRepositories.findSessionById(userExists.id);
    if(session){
        return {id: userExists.id, name: userExists.name, foto: userExists.foto, token: session.token };
    }
    const token = uuid();
    await userRepositories.createSession(userExists.id, token);
    return {id: userExists.id, name: userExists.name, foto: userExists.foto, token } 
}

export default{
    createUser, 
    signIn
}