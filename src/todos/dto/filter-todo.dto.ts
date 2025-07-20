/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional, IsEnum, IsString, IsBoolean } from 'class-validator';
import { Priority } from '../models/todo.model';

export class FilterTodoDto {
  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: Priority;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;

  @IsOptional()
  @IsString()
  search?: string;
}
