import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MemberDto, UpdateMemberDto } from './dto/user.request';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor (private readonly prisma: PrismaService) {}

    async singUp(input: MemberDto) {
        const { name, email, phoneNumber, address, password, membershipStart } = input;
        const checkUser = await this.__checkIfMemberExistsByEmail(input.email);
        if(checkUser) {
            throw new BadRequestException('This User Already Exist');
        }else {
            try {
                const hashPass = await bcrypt.hash(input.password, 10);
                const user = await this.prisma.member.create({
                    data: {
                        name,
                        email,
                        address,
                        phoneNumber,
                        membershipStart,
                        password: {
                            create: {
                                passwordHash: hashPass
                            }
                        }
                    }
                });
                return user;
            }catch (error) {
                console.error(error);
                throw new Error(`Failed To Create User: ${error.message}`);   
            }
        }
    }

    async getMembers() {
        try {
          const users = await this.prisma.member.findMany();
          return users;  
        } catch (error) {
          console.error(error)  
        }
        
    }

    async updateMember(id: string, update: UpdateMemberDto) {
        try {
            const checkUser = await this.__checkIfMemberExistsById(id);
            if(!checkUser){
                throw new NotFoundException('User Not Found');
            }
            const user = await this.prisma.member.update({
                where: { id },
                data: update
            })
            return user;
        } catch (error) {
            console.error(error);
            throw new Error(`Failed To Update User: ${error.message}`);
        }
    }

    async deactivateMember(id: string){
        const findUser = await this.__checkIfMemberExistsById(id);
        if(!findUser) {
            throw new NotFoundException('User Not Found');
        }
        return await this.prisma.member.update({
            where: {id: findUser.id},
            data: {
                isActive: {
                    set: !findUser.isActive
                }
            }
        })
    }

    // Helper Functions//
    async __checkIfMemberExistsByEmail(email: string) {
        const user = this.prisma.member.findUnique({
          where: { email }
        });
        return user;
      }

      async __checkIfMemberExistsById(id: string) {
            const user = this.prisma.member.findUnique({
                where: {id}
            });
            return user;
      }
}
