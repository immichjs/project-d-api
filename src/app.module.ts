import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Módules
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        synchronize: false,
        autoLoadEntities: true,
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        migrations: [`${__dirname}/typeorm/migrations/{.ts,*.js}`],
        migrationsTableName: 'migrations',
        migrationsRun: true,
        cli: {
          migrationsDir: 'src/typeorm/migrations',
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    SharedModule,
  ],
})
export class AppModule {}
