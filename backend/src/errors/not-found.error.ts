import { AppError } from './app.error';

export class NotFoundError extends AppError {
    readonly statusCode = 404;
    readonly code = 'NOT_FOUND';

    constructor(message: string = 'Данной страницы не существует') {
        super(message);
    }

    serializeError(): { error: {message: string, code: string}  } {
        return {
            error: {
                code: this.code,
                message: this.message,
            }

        };
    }
}