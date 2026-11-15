import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  //Configuração do conteúdo da documentação do Swagger
  const configSwagger = new DocumentBuilder()
    .setTitle("Auth API - NestJS")
    .setDescription("API para cadastro e autenticação de usuários.")
    .setVersion("1.0")
    .build();

    //Gerando a documentação
    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup("Swagger", app, document);

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
