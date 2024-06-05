import { Prisma } from "@prisma/client";

export const AuthMember = {
    select: {
        id: true,
        role: true,
        email: true,
    },
} satisfies Prisma.MemberDefaultArgs;

export type AuthUser = Prisma.MemberGetPayload<typeof AuthMember>