import { Logger, ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

const logger = new Logger();

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(error: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();

        if (error.getStatus() === HttpStatus.UNAUTHORIZED) {
            if (typeof error.response !== 'string') {
                error.response['message'] =
                    error.response.message || 'You do not have permission to access this resource';
            }
        }

        let errorMessage = {
            statusCode: error.getStatus(),
            error: error.response.name || error.response.error || error.name,
            message: error.response.message || error.response || error.message,
            errors: error.response.errors || null,
            timestamp: new Date().toISOString(),
            path: req ? req.url : null,
        };

        logger.error(errorMessage);

        res.status(error.getStatus()).json(errorMessage);
    }
}
