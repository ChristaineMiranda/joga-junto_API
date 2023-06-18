import prisma from "../config/database.js";



async function createUser(name: string, email: string, password: string, foto:string) {
   return await prisma.user.create({
        data:{
            name,
            email,
            password,
            foto
        }
    });
}

async function findByEmail(email:string) {
    return await prisma.user.findFirst({
        where:{ email }
    });  
}
async function findSessionById(id: number) {
    return await prisma.session.findFirst({
        where: { id }
    });
}

async function createSession( userId:number, token:string) {
    return await prisma.session.create({
        data:{
            userId,
            token
        }        
    });
}
async function findSessionByToken(token: string){
    return await prisma.session.findFirst({
        where:{ token }
    });
}
async function findUserById(id:number) {
    return await prisma.user.findFirst({
        where:{ id }
    });
}

export default{
    createUser,
    findByEmail,
    findSessionById,
    createSession, 
    findSessionByToken,
    findUserById
}