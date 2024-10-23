import { IsInt, Min, IsPositive } from 'class-validator';

export class CreateUserLevelDto {
  @IsInt()
  @Min(1, { message: 'O nível deve ser no mínimo 1' })
  level: number;

  @IsInt()
  @IsInt()
  @Min(0, { message: 'A experiência requerida deve ser 0 ou um número positivo' })
  expRequired: number;
}
