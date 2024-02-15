import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { ClassConstructor, classToPlain, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function Serialize<T>(dto: ClassConstructor<T>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private dto: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> | Promise<Observable<T>> {
    return next.handle().pipe(
      map((data: T) => {
        return classToPlain(
          plainToClass(this.dto, data, {
            excludeExtraneousValues: true,
          }),
        ) as T;
      }),
    );
  }
}
