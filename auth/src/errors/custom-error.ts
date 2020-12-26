export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(str: string){
        super(str);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    
    abstract serializeError():{ message: string, field?: string }[]
}

