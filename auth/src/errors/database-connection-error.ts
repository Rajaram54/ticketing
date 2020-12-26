import { CustomError } from '../errors/custom-error';

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Connection Error';
    
    constructor(){
        super('Connection Error');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeError() {
        return [{ message: this.reason }];
    }
}