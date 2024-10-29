// update-task.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsInt, Min, IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsInt({ message: 'O campo userId deve ser um número inteiro.' })
  @IsOptional()
  @Min(1, { message: 'O userId deve ser um valor válido.' })
  userId?: number; // Caso o usuário precise ser atualizado
}
