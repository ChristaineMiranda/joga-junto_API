import prisma from "../config/database.js";

async function listGroups(userId: number) {
    const groups = await prisma.group.findMany({
        select: {
            id: true,
            codeGroup: true,
            name: true,
            User: {
                select: {
                    name: true,
                    foto: true
                }
            },
            GroupUser: {
                where: { userId },
                select: { id: true }
            }
        }
    });
    const groupsWithMembership = groups.map(group => {
        const userBelongsToGroup = group.GroupUser.length > 0;
        return {
            ...group,
            userBelongsToGroup
        };
    });
    return groupsWithMembership;
}

async function listMyGroups(userId: number) {
    return await prisma.groupUser.findMany({
        where: { userId },
        select: {
            Group: true,
            score: true
        }

    });
}

async function createGroup(creatorId: number, codeGroup: string, name: string) {
    
    return await prisma.group.create({
        data: {
            creatorId,
            codeGroup,
            name
        }
    });
}

async function findGroupByName(name: string) {
    return await prisma.group.findUnique({
        where: { name }
    });
}

async function associateUserToGroup(userId: number, groupId: number) {
    await prisma.groupUser.create({
        data: {
            userId,
            groupId,
        }
    });
}

async function rankingGroup(groupId: number) {
    return await prisma.groupUser.findMany({
        where: {
            groupId
        },
        include: {
            User: {
                select: {
                    name: true,
                    foto: true
                }
            },
            Group: {
                select: {
                    name: true
                }
            }
        },
        orderBy: { score: "desc" }
    });
}

async function findGroupById(idGroup: number) {
    return await prisma.group.findUnique({
        where: { id: idGroup }
    });
}

async function rankingGeral() {
    return await prisma.groupUser.findMany({

        select: {
            score: true,
            User: {
                select: {
                    id: true,
                    name: true,
                    foto: true
                }
            }
        },
        distinct: ["userId"],
        orderBy: { score: "desc" }
    });
}

async function findGroupByCode(codeGroup: string) {
    return await prisma.group.findUnique({
        where: { codeGroup }
    });
}

async function findMemberGroupRelation(userId: number, groupId: number) {
    const relation = await prisma.groupUser.findFirst({
        where: {
            userId,
            groupId
        }
    });
    return (relation !== null);
}

async function findRegisterGroupUser(userId: number, groupId: number) {
    return await prisma.groupUser.findFirst({
        where: {
            userId,
            groupId
        }
    });
}

async function updateScore(id: number, points: number) {
    return await prisma.groupUser.update({
        where: { id },
        data: {
            score: points
        }
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
    findGroupById,
    findGroupByCode,
    findMemberGroupRelation,
    findRegisterGroupUser,
    updateScore
}