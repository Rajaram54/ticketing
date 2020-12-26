import { CustomError } from '../errors/custom-error';
export class NotAuthorizedError extends CustomError {
    statusCode = 401;
    constructor() {
        super('Not authorised');
        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }
    serializeError() {
        return [{ message: 'Not authorised' }]
    }

}