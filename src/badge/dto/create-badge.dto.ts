import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateBadgeDto {
  @IsNotEmpty({ message: 'O título não pode ser nulo' })
  @IsString({ message: 'O título tem que ser uma string' })
  title: string;

  @IsNotEmpty({ message: 'O nível requerido não pode ser nulo' })
  @IsInt({ message: 'O nível requerido tem que ser do tipo number' })
  @Min(1, { message: 'O nível requerido tem que ser maior que 0' })
  requiredLevel: number;
}
