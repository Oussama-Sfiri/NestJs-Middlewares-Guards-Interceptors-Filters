import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestService } from './request.service';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './inteceptors/logging.interceptor';
import { FreezePipe } from './pipes/freeze.pipe';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller()
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService,
              private readonly requestService: RequestService
    ) {}

  @Get()
  getHello(): string {
    const userId = this.requestService.getUserId();
    this.logger.log("getUserId : ",userId);
    return this.appService.getHello();
  };

  @Get("error")
  throwError() {
    throw new HttpException("this is the Exception route", HttpStatus.BAD_REQUEST);
  }

  @Post()
  postUser(@Body(FreezePipe) body : any) {
    body.title = "yoooo";
  };

}
