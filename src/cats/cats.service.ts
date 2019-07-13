import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Cat } from 'src/cats/interfaces/cat.interface';
import { CreateCatDto } from './dto/createCat.dto';
import { UpdateCatDto } from './dto/updateCat.dto';

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    async findAll(): Promise<Cat[]> {
        return this.cats;
    }

    async findOne(id: string): Promise<Cat> {
        const cat = this.cats.find(c => c.id === Number(id));

        if (!cat) {
            throw new HttpException('The cat with the given id was not found', HttpStatus.BAD_REQUEST);
        }

        return cat;
    }

    async create(createCatDto: CreateCatDto): Promise<Cat> {
        const newCat: Cat = {
            id: this.cats.length + 1,
            name: createCatDto.name,
            age: createCatDto.age
        };

        this.cats.push(newCat);

        return newCat;
    }

    async update(updateCatDto: UpdateCatDto): Promise<Cat> {
        const cat = this.cats.find(c => c.id === updateCatDto.id);

        if (!cat) {
            throw new HttpException('The cat with the given id was not found', HttpStatus.BAD_REQUEST);
        }

        cat.name = updateCatDto.name;
        cat.age = updateCatDto.age;

        return cat;
    }

    async delete(id: string): Promise<void> {
        const catIndex = this.cats.findIndex(c => c.id === Number(id));

        if (catIndex === -1) {
            throw new HttpException('The cat with the given id was not found', HttpStatus.BAD_REQUEST);
        }

        this.cats.splice(catIndex, 1);
    }
}
