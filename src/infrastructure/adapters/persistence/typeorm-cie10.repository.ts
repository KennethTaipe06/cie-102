import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import {
  ICie10Repository,
  Cie10Filters,
  PaginatedResult,
} from '../../../domain/repositories/cie10.repository.port';
import { Cie10 } from '../../../domain/entities/cie10.entity';
import { Cie10Schema } from './cie10.schema';

@Injectable()
export class TypeOrmCie10Repository implements ICie10Repository {
  constructor(
    @InjectRepository(Cie10Schema)
    private readonly repository: Repository<Cie10Schema>,
  ) {}

  async findAll(filters: Cie10Filters): Promise<PaginatedResult<Cie10>> {
    const { page = 1, limit = 10, search } = filters;
    const skip = (page - 1) * limit;

    const queryBuilder = this.repository.createQueryBuilder('cie10');

    if (search) {
      queryBuilder.where(
        'cie10.description ILIKE :search OR cie10.code ILIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    const [data, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      data: data.map((item) => new Cie10(item)),
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async findByCode(code: string): Promise<Cie10 | null> {
    const item = await this.repository.findOneBy({ code });
    return item ? new Cie10(item) : null;
  }
}
