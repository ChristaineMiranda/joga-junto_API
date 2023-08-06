import prisma from "../config/database.js";

async function listGroups() {
    return await prisma.group.findMany();    
}

async function listMyGroups(userId:number) {
    return await prisma.groupUser.findMany({
        where:{userId},
        include:{Group: true}
    });    
}

async function createGroup(creatorId: number, codeGroup: string, name:string ) {
    return await prisma.group.create({
        data:{
            creatorId,
            codeGroup,
            name
        }
    });
}

async function findGroupByName(name:string) {
    return await prisma.group.findUnique({
        where: { name }
    });  
}

async function associateUserToGroup(userId:number, groupId:number) {
    await prisma.groupUser.create({
        data: {
            userId,
            groupId,
        }
    });
}

async function rankingGroup(groupId:number) {
    return await prisma.groupUser.findMany({
        where:{
            groupId
        },
        include: { 
            User: {
                select: {
                    name: true,
                    foto: true
                }
            }
        },
        orderBy: { score: "desc"}
    });
}


async function rankingOverall() {
    return await prisma.user.findMany({
        include: {
            GroupUser: {
                select:{
                    score: true
                },
                orderBy:{
                    score: "desc"
                },
                take: 1
            }
        },        
    });
}


async function findGroupByCode(codeGroup:string) {
    return await prisma.group.findUnique({
        where: { codeGroup:codeGroup }
    });  
}

async function rankingGeral() {
    return await prisma.groupUser.findMany({
        include: { User: true },
        orderBy: { score: "desc" }
    });  
}

export default {
    listGroups,
    listMyGroups,
    createGroup,
    findGroupByName,
    associateUserToGroup,
    rankingGroup, 
    rankingGeral,
    findGroupByCode,
    rankingOverall
}