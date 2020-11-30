import { IsNotEmpty, IsString } from 'class-validator';

export class FindProductsInputDto {
  @IsString()
  @IsNotEmpty()
  searchString: string;
}
