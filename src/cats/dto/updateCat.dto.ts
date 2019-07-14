import { IsString, IsNumber } from 'class-validator';

export class UpdateCatDto {
    @IsString()
    readonly name: string;

    @IsNumber()
    readonly age: number;
}
