import { ArgumentMetadata, Injectable, Logger, PipeTransform } from "@nestjs/common";

@Injectable()
export class FreezePipe implements PipeTransform {
    private readonly logger = new Logger(FreezePipe.name);
    transform(value: any, metadata: ArgumentMetadata) {
        this.logger.debug("FreezePipe running...");
        Object.freeze(value); //Freezes the input object, making it immutable. This means that properties of the object cannot be added, modified, or removed after this point.
        return value;
    }
}