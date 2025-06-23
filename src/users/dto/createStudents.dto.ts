import { ApiProperty } from '@nestjs/swagger';
import { Student, $Enums } from '@prisma/client';

export class CreateStudentDto implements Partial<Student> {
    @ApiProperty({
            description: 'The unique identifier of the student',
            example: '123def',
        })
        studentId: string;
        @ApiProperty({
            description: 'The name of the student',
            example: 'Information Technology',
        })
        department: string;
    
        @ApiProperty({
            description: 'The mail',
            example: 'asdas@addu.edu.ph',
        })
        email: string;
    
        @ApiProperty({
            description: 'The name of the student',
            example: 'Maria Smith',
        })
        name: string; 
    
        @ApiProperty({
            description: 'The role of the student',
            example: $Enums.Role.ADMIN,
            enum: $Enums.Role,
    
        })
        role: $Enums.Role
}