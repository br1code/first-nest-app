import { IsString, IsNumber } from 'class-validator';

export class UpdateCatDto {
    @IsNumber()
    readonly id: number;

    @IsString()
    readonly name: string;

    @IsNumber()
    readonly age: number;
}
