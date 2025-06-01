import { BadRequestException, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4, validate as isUuid } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService<T extends { id: string }> {
  protected entities: T[] = [];

  create(entityDto: T) {
    const entity = {
      id: uuidV4(),
      ...entityDto,
    };

    this.entities.push(entity);

    return entity;
  }

  findAll(): T[] {
    return this.entities;
  }

  findById(id: string): T {
    if (!isUuid(id)) {
      throw new BadRequestException('Record Id is invalid (not uuid)');
    }

    const entity = this.entities.find((entity) => entity.id === id);

    if (!entity) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    return entity;
  }

  update(id: string, entityDto: Omit<T, 'id'>): T {
    if (!isUuid(id)) {
      throw new BadRequestException('Record Id is invalid (not uuid)');
    }

    const entity = this.entities.find((entity) => entity.id === id);

    if (!entity) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    for (const key in entityDto) {
      entity[key] = entityDto[key];
    }

    return entity;
  }

  remove(id: string): void {
    if (!isUuid(id)) {
      throw new BadRequestException('Record Id is invalid (not uuid)');
    }

    const entity = this.entities.find((entity) => entity.id === id);

    if (!entity) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    this.entities.splice(this.entities.indexOf(entity), 1);
  }
}
