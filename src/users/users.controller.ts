import { 
Controller,
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  HttpStatus,
 } from '@nestjs/common';
import { UsersService } from './users.service'
import { 
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiConflictResponse,
  ApiTags,

 } from '@nestjs/swagger';
import { ReturnedStudentDto } from 'src/users/dto/returnedStudents.dto'; 
import { Student } from '@prisma/client';
import { CreateStudentDto } from 'src/users/dto/createStudents.dto'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('students')
    @ApiOperation({
        summary: 'Get all students',
        description: 'Retrieves a list of all students in the system.'
    })
    @ApiResponse({
        status: 200,
        description: 'List of students retrieved successfully.',
        type: [ReturnedStudentDto]
    })
    async findAllStudents(): Promise<Student[]> {
        return await this.usersService.findAllStudents()
    }

    @Get('students/find') 
        @ApiOperation({
        summary: 'Get a student using an ID',
        description: 'Retrieves a student using a student ID from the system.'
    })
    @ApiResponse({
        status: 200,
        description: 'Student retrieved successfully.',
        type: ReturnedStudentDto
    })
    @ApiQuery({ 
      name: 'id', 
      type: String, 
      description: 'Student ID to search for' 
    })
    async findStudentById(
        @Query('id') id: Student['studentId'] 
    ) {
        return await this.usersService.findStudentById({
            id: id
        })
    }

  @Post('students')
  @ApiOperation({
    summary: 'Create a new student',
    description: 'Creates a new student with the provided details.',
  })
  @ApiResponse({
    status: 201,
    description: 'Student created successfully.',
    type: ReturnedStudentDto,
  })
  @ApiConflictResponse({
    description: 'Student with this ID already exists.',
  })
  async createStudent(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<Student> {
    return await this.usersService.createStudent(createStudentDto);
  }
}
