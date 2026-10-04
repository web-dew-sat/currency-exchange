
export abstract class AppError extends Error {
    abstract readonly statusCode: number;
    abstract readonly code: string;

    protected constructor(message: string) {
        super(message);
        this.name = new.target.name;
    }

    abstract serializeError(): { error: {message: string, code: string}  };
}