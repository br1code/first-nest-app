import { Injectable } from '@nestjs/common';
import { Cat } from 'src/cats/interfaces/cat.interface';
import { CreateCatDto } from './dto/createCat.dto';
import { UpdateCatDto } from './dto/updateCat.dto';
import { CatNotFoundException } from './exceptions/catNotFound.exception';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CatsService {
    constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) { }

    async findAll(): Promise<Cat[]> {
        return await this.catModel.find();
    }

    async findOne(id: string): Promise<Cat> {
        const cat = await this.catModel.findById(id);

        if (!cat) {
            throw new CatNotFoundException(id);
        }

        return cat;
    }

    async create(createCatDto: CreateCatDto): Promise<Cat> {
        const newCat = await this.catModel.create(createCatDto);

        return newCat;
    }

    async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
        const updated = await this.catModel.findByIdAndUpdate(id, updateCatDto, { new: true });

        if (!updated) {
            throw new CatNotFoundException(id);
        }

        return updated;
    }

    async delete(id: string): Promise<void> {
        await this.catModel.findByIdAndRemove(id);
    }
}
