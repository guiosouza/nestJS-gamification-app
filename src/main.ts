import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativar validação global com ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não declaradas nos DTOs
      forbidNonWhitelisted: true, // Retorna erro se propriedades desconhecidas forem enviadas
      transform: true, // Transforma os dados no tipo correto (por exemplo, converte string para number)
    }),
  );

  await app.listen(3333);
}
bootstrap();
