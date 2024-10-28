import { IsString, IsNotEmpty, MinLength, IsOptional, IsBoolean, IsInt, Min } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  name: string;

  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  password: string;

  @IsBoolean({ message: 'isActive deve ser um valor booleano.' })
  @IsOptional()
  isActive?: boolean;

  @IsInt({ message: 'totalExp deve ser um número inteiro.' })
  @Min(0, { message: 'totalExp deve ser pelo menos 0.' })
  @IsOptional()
  totalExp?: number;

  // Remove o campo expNeededToLevelUp, pois ele será calculado dinamicamente pelo serviço

  @IsInt({ message: 'O nível deve ser um número inteiro.' })
  @Min(1, { message: 'O nível deve ser pelo menos 1.' })
  @IsOptional()
  level?: number;
}
