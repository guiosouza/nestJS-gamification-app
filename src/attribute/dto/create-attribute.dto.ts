import { IsString, IsInt, IsOptional, Min } from 'class-validator';

export class CreateAttributeDto {
  @IsString()
  title: string;

  @IsInt()
  @Min(0)
  exp: number;

  @IsInt()
  @Min(1)
  level: number;

  @IsOptional() // Define como opcional, caso você não queira passar o array de IDs de tarefa
  tasks?: number[];

  @IsOptional() // Define como opcional, caso você não queira passar o array de IDs de usuários
  users?: number[];
}
