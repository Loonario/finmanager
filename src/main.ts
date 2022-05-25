import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as packageJson from '../package.json';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

const config = new DocumentBuilder()
  .setTitle('FinManager')
  .setDescription('Codica testing project')
  .setVersion(packageJson.version)
  .addTag('cashFlow')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  await app.listen(3000, () => {
  console.log('Server started on port 3000')
  });
}
bootstrap();
