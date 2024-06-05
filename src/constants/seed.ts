import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
    await prisma.member. create({
        data: {
            name: "Librarian",
            email: "librarian@zoracom.com",
            phoneNumber: "08098765432",
            address: "Library Office",
            membershipStart: "2023-12-15T18:45:00Z",
            role: Role.LIBRARIAN,
            password: {
                create: {
                    passwordHash: await bcrypt.hash('87654321', 10),
                }
            }
        }
    })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
