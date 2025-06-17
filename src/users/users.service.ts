import { PrismaService } from 'src/prisma.service'
import { Injectable } from '@nestjs/common';
import { Student } from '@prisma/client'; // Assuming Student is a model in your Prisma schema

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {

    }

    /** 
     * Returns all students from the db
     * @returns a promise that resolves to an array of student objects. 
     */
    async findAllStudents(): Promise<Student[]> {
        return this.prisma.student.findMany();
    }
}

