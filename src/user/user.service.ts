import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto, UpdateUserDto } from './dto/user.request';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor (private readonly prisma: PrismaService) {}

    async hashPassword (password: string) {
        const saltOrRounds = 10
        return await bcrypt.hash(password, saltOrRounds)
    }

    async singUp(input: UserDto) {
        const { name, email, phoneNumber, address, password } = input;
        const checkUser = await this.__checkIfUserExistsByEmail(email);
        if(checkUser) {
            throw new BadRequestException('This User Already Exist');
        }else {
            try {
                const hashPass = await this.hashPassword(password);
                const user = await this.prisma.user.create({
                    data: {
                        name,
                        email,
                        address,
                        phoneNumber,
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

    async getUsers() {
        try {
          const users = await this.prisma.user.findMany();
          return users;  
        } catch (error) {
          console.error(error)  
        }
        
    }

    async updateUser(id: string, update: UpdateUserDto) {
        try {
            const checkUser = this.__checkIfUserExistsById(id);
            if(!checkUser){
                throw new NotFoundException('User Not Found');
            }
            const user = await this.prisma.user.update({
                where: { id },
                data: update
            })
            return user;
        } catch (error) {
            console.error(error);
            throw new Error(`Failed To Update User: ${error.message}`);
        }
    }

    // Helper Functions//
    async __checkIfUserExistsByEmail(email: string) {
        const user = this.prisma.user.findUnique({
          where: { email }
        });
        return user;
      }

      async __checkIfUserExistsById(id: string) {
            const user = this.prisma.user.findUnique({
                where: {id}
            });
            return user;
      }
}
