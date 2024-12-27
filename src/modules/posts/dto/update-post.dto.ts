import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'Title must be at least 5 characters' })
  @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Content must be at least 10 characters' })
  content?: string;
}
