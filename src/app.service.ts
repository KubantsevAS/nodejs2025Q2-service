import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { v4 as uuidV4, validate as isUuid } from 'uuid';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class AppService<T> {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  protected getModelName(): string {
    throw new Error('getModelName must be implemented by child class');
  }

  async findAll(): Promise<T[]> {
    const modelName = this.getModelName();
    const result = await this.prisma[modelName].findMany();

    return result as T[];
  }

  async findById(id: string): Promise<T> {
    if (!isUuid(id)) {
      throw new BadRequestException('Record Id is invalid (not uuid)');
    }

    const modelName = this.getModelName();
    const entity = await this.prisma[modelName].findUnique({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    return entity as T;
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    const entity = {
      id: uuidV4(),
      ...data,
    };

    const modelName = this.getModelName();
    return this.prisma[modelName].create({
      data: entity,
    }) as Promise<T>;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    await this.findById(id);

    const modelName = this.getModelName();

    return this.prisma[modelName].update({
      where: { id },
      data,
    }) as Promise<T>;
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);

    const modelName = this.getModelName();

    await this.prisma[modelName].delete({
      where: { id },
    });
  }
}
