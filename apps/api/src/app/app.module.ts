import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "./auth/auth.module";
import {TokenEntity} from "./auth/entities/token.entity";
import {UserEntity} from "./auth/entities/user.entity";
import {JwtAuthGuard} from "./auth/guards/jwt.guard";
import {ClassificationEntity} from "./people/entities/classification.entity";
import {PersonEntity} from "./people/entities/person.entity";
import {PeopleModule} from './people/people.module';

let envFilePath = '.env.development';
if (process.env.ENVIRONMENT === 'production') {
  envFilePath = '.env.production';
} else if (process.env.ENVIRONMENT === 'testing') {
  envFilePath = '.env.testing';
}

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PWD,
      entities: [UserEntity, TokenEntity, PersonEntity, ClassificationEntity],
      synchronize: true
    }),

    AuthModule,
    PeopleModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
