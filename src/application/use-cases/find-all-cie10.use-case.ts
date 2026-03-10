import {
  ICie10Repository,
  Cie10Filters,
  PaginatedResult,
} from '../../domain/repositories/cie10.repository.port';
import { Cie10 } from '../../domain/entities/cie10.entity';

export class FindAllCie10UseCase {
  constructor(private readonly cie10Repository: ICie10Repository) {}

  async execute(filters: Cie10Filters): Promise<PaginatedResult<Cie10>> {
    const page = filters.page || 1;
    let limit = filters.limit || 10;

    // Forzar límite máximo de 100
    if (limit > 100) {
      limit = 100;
    }

    return this.cie10Repository.findAll({
      page,
      limit,
      search: filters.search,
    });
  }
}
