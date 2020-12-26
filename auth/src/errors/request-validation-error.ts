import { ValidationError } from 'express-validator';
import { CustomError } from '../errors/custom-error';

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(public errors: ValidationError[]){
        super('Validation error');
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeError() {
        let formattedErrror = this.errors.map((val) => {
            return { message: val.msg, field: val.param };
        });

        return formattedErrror;
    }
}