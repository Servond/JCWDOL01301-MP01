export interface User {
    id?: number
    name: string
    email: string
    password: string
    roleId?: number
    isVerified: Boolean
    referral_code?: string
    createdAt?: Date;
    updatedAt?: Date;
}