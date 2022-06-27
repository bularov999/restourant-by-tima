import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const port = configService.get('PORT')
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Restourant')
    .setDescription('restourant app')
    .setVersion('1.0')
    .addTag('restourant')
    .build()
    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('api', app, document)
  console.log(port)
  await app.listen(port);
}
bootstrap();
