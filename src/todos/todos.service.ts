import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Todo } from './models/todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { generateUuid } from './utils/uuid';

@Injectable()
export class TodosService {
  /**
   * Stockage en mémoire des tâches
   */
  private todos: Todo[] = [];

  /**
   * Créer une nouvelle tâche
   */
  create(createTodoDto: CreateTodoDto): Todo {
    // Vérification d'unicité du titre (insensible à la casse)
    const exists = this.todos.some((t) => t.title.trim().toLowerCase() === createTodoDto.title.trim().toLowerCase());
    if (exists) {
      throw new ConflictException('Une tâche avec ce titre existe déjà.');
    }
    const now = new Date();
    const id: string = generateUuid();
    const todo: Todo = {
      id,
      title: createTodoDto.title,
      description: createTodoDto.description,
      priority: createTodoDto.priority ?? 'medium',
      tags: createTodoDto.tags ?? [],
      isFavorite: createTodoDto.isFavorite ?? false,
      createdAt: now,
      updatedAt: now,
    };
    this.todos.push(todo);
    return todo;
  }

  /**
   * Retourner toutes les tâches, avec filtres avancés
   */
  findAll(filterDto?: FilterTodoDto): Todo[] {
    let result = [...this.todos];
    if (!filterDto) return result;
    const { priority, tag, isFavorite, search } = filterDto;
    if (priority) {
      result = result.filter((todo) => todo.priority === priority);
    }
    if (typeof isFavorite === 'boolean') {
      result = result.filter((todo) => todo.isFavorite === isFavorite);
    }
    if (tag) {
      result = result.filter((todo) => todo.tags?.includes(tag));
    }
    if (search) {
      const lower = search.toLowerCase();
      result = result.filter(
        (todo) =>
          todo.title.toLowerCase().includes(lower) ||
          (todo.description && todo.description.toLowerCase().includes(lower)),
      );
    }
    return result;
  }

  /**
   * Retourner une tâche par son ID
   */
  findOne(id: string): Todo {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) throw new NotFoundException(`Tâche avec id ${id} non trouvée.`);
    return todo;
  }

  /**
   * Mettre à jour une tâche
   */
  update(id: string, updateDto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);
    // prettier-ignore
    const { title, description, priority, tags, isFavorite } = updateDto as Partial<CreateTodoDto>;

    // Mise à jour élégante avec Object.assign
    Object.assign(todo, {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(priority !== undefined && { priority }),
      ...(tags !== undefined && { tags }),
      ...(isFavorite !== undefined && { isFavorite }),
    });

    todo.updatedAt = new Date();
    return todo;
  }

  /**
   * Supprimer une tâche et retourner la tâche supprimée
   */
  remove(id: string): Todo {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Tâche avec id ${id} non trouvée.`);
    }
    const [deleted] = this.todos.splice(index, 1);
    return deleted;
  }
}
