import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class UpdateBadgeDto {
  @IsOptional()
  @IsString({ message: 'O título tem que ser uma string' })
  title?: string;

  @IsOptional()
  @IsInt({ message: 'O nível requerido tem que ser do tipo number' })
  @Min(1, { message: 'O nível requerido tem que ser maior que 0' })
  requiredLevel?: number;
}
