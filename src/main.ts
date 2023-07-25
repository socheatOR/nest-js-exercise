import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadGatewayException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Apply validation globally
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: (origin, callback) => {
      callback(null, true);
    }
  });
  await app.listen(3000);
  
}
bootstrap();