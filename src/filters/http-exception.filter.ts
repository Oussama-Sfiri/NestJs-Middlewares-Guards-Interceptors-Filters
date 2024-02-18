import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: HttpException, host: ArgumentsHost) {
        this.logger.log(HttpException.name);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const exceptionStatus = exception.getStatus();

        response.status(exceptionStatus).json({
            statusCode: exceptionStatus,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}