import { ApiProperty } from '@nestjs/swagger';
import { Student, $Enums } from '@prisma/client';

export class ReturnedStudentDto implements Partial<Student> {
    @ApiProperty({
        description: 'The unique identifier of the student',
        example: '123abc',
    })
    studentId: string;
    @ApiProperty({
        description: 'The name of the student',
        example: 'Computer Science',
    })
    department: string;

    @ApiProperty({
        description: 'The mail',
        example: 'Yourmom123@addu.edu.ph',
    })
    email: string;

    @ApiProperty({
        description: 'The name of the student',
        example: 'John Doe',
    })
    name: string; 

    @ApiProperty({
        description: 'The role of the student',
        example: $Enums.Role.STUDENT,
        enum: $Enums.Role,

    })
    role: $Enums.Role
}