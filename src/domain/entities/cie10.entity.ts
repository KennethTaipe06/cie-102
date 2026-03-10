import { ApiProperty } from '@nestjs/swagger';

export class Cie10 {
  @ApiProperty()
  code: string;

  @ApiProperty({ required: false })
  code_0?: string;

  @ApiProperty({ required: false })
  code_1?: string;

  @ApiProperty({ required: false })
  code_2?: string;

  @ApiProperty({ required: false })
  code_3?: string;

  @ApiProperty({ required: false })
  code_4?: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  level: number;

  @ApiProperty()
  source: string;

  constructor(partial: Partial<Cie10>) {
    Object.assign(this, partial);
  }
}
