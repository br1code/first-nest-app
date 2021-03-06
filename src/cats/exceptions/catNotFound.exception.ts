import { HttpException, HttpStatus } from '@nestjs/common';

export class CatNotFoundException extends HttpException {
    constructor(id: string) {
        super(`The cat with the given ID ${id} was not found`, HttpStatus.BAD_REQUEST);
    }
}
