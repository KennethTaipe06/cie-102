import { Cie10 } from '../entities/cie10.entity';

export interface PageMetadata {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PageMetadata;
}

export interface Cie10Filters {
  page?: number;
  limit?: number;
  search?: string;
}

export const CIE10_REPOSITORY = 'CIE10_REPOSITORY';

export interface ICie10Repository {
  findAll(filters: Cie10Filters): Promise<PaginatedResult<Cie10>>;
  findByCode(code: string): Promise<Cie10 | null>;
}
