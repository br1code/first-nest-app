import { Injectable } from '@nestjs/common';
import { Cat } from 'src/cats/interfaces/cat.interface';
import { CreateCatDto } from './dto/createCat.dto';
import { UpdateCatDto } from './dto/updateCat.dto';
import { CatNotFoundException } from './exceptions/catNotFound.exception';

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    async findAll(): Promise<Cat[]> {
        return this.cats;
    }

    async findOne(id: number): Promise<Cat> {
        const cat = this.cats.find(c => c.id === id);

        if (!cat) {
            throw new CatNotFoundException(id);
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
            throw new CatNotFoundException(updateCatDto.id);
        }

        cat.name = updateCatDto.name;
        cat.age = updateCatDto.age;

        return cat;
    }

    async delete(id: number): Promise<void> {
        const catIndex = this.cats.findIndex(c => c.id === id);

        if (catIndex === -1) {
            throw new CatNotFoundException(id);
        }

        this.cats.splice(catIndex, 1);
    }
}
