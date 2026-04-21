import prisma from "../lib/prisma";
import type {User} from '@type/types'


export const create = async(user: User):Promise<User> => {
        return await prisma.user.create({data: user});
}

export const findByEmail = async (email: string):Promise<User | null> => {
        return await prisma.user.findUnique({where: {email}})
}