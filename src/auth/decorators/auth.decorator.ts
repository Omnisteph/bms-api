import { UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "@prisma/client";
import { Roles } from "./roles.decorator";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { RolesGuard } from "../guards/roles.guard";

export const Auth = (role?: Role[]) => {
    if (!role?.length) return applyDecorators(UseGuards(JwtAuthGuard));
    return applyDecorators(Roles(...role), UseGuards(JwtAuthGuard, RolesGuard));
}