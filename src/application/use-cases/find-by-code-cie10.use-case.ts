import { ICie10Repository } from '../../domain/repositories/cie10.repository.port';
import { Cie10 } from '../../domain/entities/cie10.entity';

export class FindByCodeCie10UseCase {
  constructor(private readonly cie10Repository: ICie10Repository) {}

  async execute(code: string): Promise<Cie10 | null> {
    return this.cie10Repository.findByCode(code);
  }
}
