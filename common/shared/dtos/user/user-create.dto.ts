import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UserCreateDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 30,
    description: 'The age of the user',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly age: number;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'The password of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
