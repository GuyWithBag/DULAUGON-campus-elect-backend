import { PrismaService } from 'src/prisma.service'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Student } from '@prisma/client'; // Assuming Student is a model in your Prisma schema 
import { CreateStudentDto } from './dto/createStudents.dto';

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

  async createStudent(data: CreateStudentDto): Promise<Student> {
    // Check if student already exists
    const existing = await this.prisma.student.findUnique({
      where: { studentId: data.studentId },
    });
    if (existing) {
      throw new ConflictException('Student with this ID already exists.');
    }
    return this.prisma.student.create({ data });
  }
}

