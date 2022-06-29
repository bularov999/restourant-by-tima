import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Restourant')
    .setDescription('restourant app')
    .setVersion('1.0')
    .addTag('restourant')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);
  app.setGlobalPrefix('api');
  console.log(port);
  await app.listen(port);
}
bootstrap();
