import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { FindProductsInputDto } from './dto/find-products-input.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsSercvice: ProductsService) {}

  @Get('')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async findProducts(@Query() productsQuery: FindProductsInputDto): Promise<Product[]> {
    const { searchString } = productsQuery;
    return await this.productsSercvice.findProductsBySearchString(searchString);
  }
}
