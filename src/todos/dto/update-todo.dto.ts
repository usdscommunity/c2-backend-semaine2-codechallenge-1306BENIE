import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
