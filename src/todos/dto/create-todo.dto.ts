/* eslint-disable @typescript-eslint/no-unsafe-call */
// prettier-ignore
import { IsString, IsOptional, IsEnum, IsArray, IsBoolean } from 'class-validator';
import { Priority } from '../models/todo.model';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: Priority = 'medium';

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean = false;
}
