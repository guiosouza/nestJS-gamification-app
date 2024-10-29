import { IsString, IsNotEmpty, IsBoolean, IsInt, IsOptional, Min, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'O título deve ser uma string.' })
  @IsNotEmpty({ message: 'O título não pode estar vazio.' })
  @MinLength(3, { message: 'O título deve ter pelo menos 3 caracteres.' })
  title: string;

  @IsString({ message: 'A descrição deve ser uma string.' })
  @IsOptional()
  description?: string;

  @IsInt({ message: 'A experiência deve ser um número inteiro.' })
  @Min(0, { message: 'A experiência mínima é 0.' })
  exp: number;

  @IsBoolean({ message: 'O campo isTimeBased deve ser um valor booleano.' })
  isTimeBased: boolean;

  @IsInt({ message: 'timePack deve ser um número inteiro.' })
  @Min(0, { message: 'O timePack mínimo é 0.' })
  @IsOptional()
  timePack?: number;

  @IsInt({ message: 'totalTime deve ser um número inteiro.' })
  @Min(0, { message: 'O totalTime mínimo é 0.' })
  @IsOptional()
  totalTime?: number;

  @IsBoolean({ message: 'O status deve ser um valor booleano.' })
  status: boolean;

  @IsInt({ message: 'O campo userId deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O campo userId é obrigatório.' })
  userId: number;  // Para associar a tarefa ao usuário
}
