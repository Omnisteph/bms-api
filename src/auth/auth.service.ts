import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}
    async validateUser(email: string, pass: string): Promise<any>{
        this.logger.log(`Validating User With Email: ${email}`);
        const user = await this.prisma.member.findUnique({
            where: {email},
            include: {
                password: true,
            },
        });
        
        if(user) {
            this.logger.log(`User Found With Email: ${email}`);
            const passwordMatches = await compare(pass, user.password.passwordHash);
            if(passwordMatches) {
                this.logger.log(`Password Matches For User With Email: ${email}`);
                const { password, ...result} = user;
                return result
            } else {
                this.logger.warn(`Password Does Not Match For User With Email: ${email}`);
            } 
        } else {
            this.logger.warn(`No User Found With Email: ${email}`);
        }

        // if(user && await bcrypt.compare( user.password.passwordHash, pass )) {
        //     const { password, ...result } = user;
        //     return result;
        // }
        return null;
    }

    async signIn(sigin: AuthDto) {
        const { email, password } = sigin;
        this.logger.log(`Attempting to log in user with email: ${email}`);
        const user = await this.validateUser(email, password);
        
        if(!user) {
            this.logger.warn(`Login failed for user with email: ${email}`);
             throw new UnauthorizedException('Invalid Credentials');
            
        }
        this.logger.log(`Login successful for user with email: ${email}`);

         const payload = {email: user.email, role: user.role, sub: user.id};
         return {
             access_token: this.jwtService.sign(payload),
             user,
         }
    }
}
