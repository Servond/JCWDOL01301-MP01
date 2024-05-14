import { User } from "@/interface/user.interface";
import prisma from "@/prisma";


export class UserQuery {
    public getUserByEmail = async (email: string): Promise<User | null> => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            return user
        } catch (error) {
            throw error
        }
    }
}