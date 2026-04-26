import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardGateway } from './dashboard/dashboard.gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    // config module for get env variable data
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // db conection typeorm
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: Number(configService.get('DB_PORT', 3306)),
        username: configService.get('DB_USERNAME', 'root'),
        password: configService.get('DB_PASSWORD', ''),
        database: configService.get('DB_NAME', 'live-dashboard'),
        entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
        synchronize: configService.get('DB_SYNCHRONIZE', true) === 'true',
      }),
      inject: [ConfigService],
    }),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, DashboardGateway],
})
export class AppModule {}
