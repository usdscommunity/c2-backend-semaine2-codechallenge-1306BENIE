import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { Todo } from './models/todo.model';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  /**
   * Créer une tâche
   */
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createTodoDto: CreateTodoDto): Todo {
    return this.todosService.create(createTodoDto);
  }

  /**
   * Lister toutes les tâches, avec filtres avancés
   */
  @Get()
  findAll(@Query() filterDto: FilterTodoDto): Todo[] {
    return this.todosService.findAll(filterDto);
  }

  /**
   * Récupérer une tâche par son ID
   */
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Todo {
    return this.todosService.findOne(id);
  }

  /**
   * Mettre à jour une tâche (partiel)
   */
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateTodoDto: UpdateTodoDto): Todo {
    return this.todosService.update(id, updateTodoDto);
  }

  /**
   * Supprimer une tâche
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.todosService.remove(id);
  }
}
