import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { UpdateCatDto } from './dto/updateCat.dto';
import { CreateCatDto } from './dto/createCat.dto';

@Controller('cats')
export class CatsController {

    constructor(private readonly catsService: CatsService) { }

    @Get()
    async getAll(): Promise<Cat[]> {
        return await this.catsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Cat> {
        return await this.catsService.findOne(id);
    }

    @Post()
    async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
        return await this.catsService.create(createCatDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): Promise<Cat> {
        return await this.catsService.update(id, updateCatDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return await this.catsService.delete(id);
    }
}
