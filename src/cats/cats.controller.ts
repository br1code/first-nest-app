import { Controller, Get, Post, Param, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
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
    async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Cat> {
        return await this.catsService.findOne(id);
    }

    @Post()
    async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
        return await this.catsService.create(createCatDto);
    }

    @Put()
    async update(@Body() updateCatDto: UpdateCatDto): Promise<Cat> {
        return await this.catsService.update(updateCatDto);
    }

    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return await this.catsService.delete(id);
    }
}
