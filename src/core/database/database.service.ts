import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  public readonly prisma: PrismaClient;
  private readonly logger = new Logger(DatabaseService.name);

  constructor() {
    this.prisma = new PrismaClient();
  }

  async onModuleInit() {
    try {
      this.prisma.$connect();
      this.logger.log('Database connected');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async onModuleDestroy() {
    try {
      this.prisma.$disconnect();
    } catch (error) {
      process.exit(1);
    }
  }
}
