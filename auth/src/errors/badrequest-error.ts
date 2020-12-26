import { CustomError } from './custom-error';

export class BadRequestError extends CustomError{
    statusCode = 404;

    constructor(public str: string){
        super(str);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeError(){
        return [{message: this.str}];
    }
}