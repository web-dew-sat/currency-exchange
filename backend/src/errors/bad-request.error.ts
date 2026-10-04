import { AppError } from './app.error';

export class BadRequestError extends AppError {
    readonly statusCode = 400;
    readonly code = 'BAD_REQUEST';

    constructor(message: string = 'Неверный запрос (некорректный синтаксис или данные)') {
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