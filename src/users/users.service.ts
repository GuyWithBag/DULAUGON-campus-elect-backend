import { PrismaService } from 'src/prisma.service'
import { Injectable, NotFoundException } from '@nestjs/common';
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

    async findStudentById({ id }: {id: Student['studentId']}): Promise<Student> {
        const student = await this.prisma.student.findUnique({
            where: {
                studentId: id
            }
        })

        if (!student) {
            // Use NotFoundException for proper HTTP Handling 
            // @see nest/common
            throw new NotFoundException("Student not found")
        }

        return student
    }
}

