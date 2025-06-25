import { ApiProperty } from '@nestjs/swagger';
import { Student, $Enums } from '@prisma/client';

export class CreateStudentDto implements Partial<Student> {
    @ApiProperty({
            description: 'The unique identifier of the student',
            example: '123defg',
        })
        studentId: string;
        @ApiProperty({
            description: 'The name of the student',
            example: 'Computer Science',
        })
        department: string;
    
        @ApiProperty({
            description: 'The mail',
            example: 'Maria@addu.edu.ph',
        })
        email: string;
    
        @ApiProperty({
            description: 'The name of the student',
            example: 'Maria Kawasaki',
        })
        name: string; 
    
        @ApiProperty({
            description: 'The role of the student',
            example: $Enums.Role.ADMIN,
            enum: $Enums.Role,
    
        })
        role: $Enums.Role
}