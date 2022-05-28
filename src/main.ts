import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as packageJson from '../package.json';
import { ValidationPipe } from '@nestjs/common';
import * as localtunnel from 'localtunnel';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('FinManager')
    .setDescription('Codica testing project')
    .setVersion(packageJson.version)
    .addTag('cashFlow')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
    

    const tunUrl = 'https://silver-chairs-turn-176-104-53-204.loca.lt';
    const tunnel = await localtunnel({ port: 3000}, 
    function(err, tunnel){
      if(err){
        console.log(err);
      }
      console.log(tunnel.url);

      tunnel.on("close", () => {
        console.log('Tunnel closed');
      });
    });
  
  

  await app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}
bootstrap();
