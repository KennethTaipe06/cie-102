import {
  Controller,
  Get,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { FindAllCie10UseCase } from '../../../application/use-cases/find-all-cie10.use-case';
import { FindByCodeCie10UseCase } from '../../../application/use-cases/find-by-code-cie10.use-case';
import { CIE10_REPOSITORY } from '../../../domain/repositories/cie10.repository.port';
import type { ICie10Repository } from '../../../domain/repositories/cie10.repository.port';
import { Inject } from '@nestjs/common';

@ApiTags('cie10')
@Controller('cie10')
export class Cie10Controller {
  private readonly findAllUseCase: FindAllCie10UseCase;
  private readonly findByCodeUseCase: FindByCodeCie10UseCase;

  constructor(
    @Inject(CIE10_REPOSITORY)
    private readonly cie10Repository: ICie10Repository,
  ) {
    this.findAllUseCase = new FindAllCie10UseCase(this.cie10Repository);
    this.findByCodeUseCase = new FindByCodeCie10UseCase(this.cie10Repository);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener catálogo CIE-10 con paginación y búsqueda',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.findAllUseCase.execute({
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      search,
    });
  }

  @Get(':code')
  @ApiOperation({ summary: 'Obtener un registro CIE-10 por su código' })
  @ApiParam({ name: 'code', type: String })
  async findByCode(@Param('code') code: string) {
    const result = await this.findByCodeUseCase.execute(code);
    if (!result) {
      throw new NotFoundException(`CIE-10 record with code ${code} not found`);
    }
    return result;
  }
}
