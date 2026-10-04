import { AppError } from './app.error';

export class UpstreamError extends AppError {
    readonly statusCode = 502;
    readonly code = 'UPSTREAM_ERROR';

    constructor(message: string = 'Не удалось получить данные о валютах') {
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