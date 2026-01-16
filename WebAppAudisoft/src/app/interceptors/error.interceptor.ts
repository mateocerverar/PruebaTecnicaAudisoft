import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const messageService = inject(MessageService);

    return next(req).pipe(
        catchError((error) => {
            let errorMessage = 'Ocurrió un error inesperado';

            if (error.error instanceof ErrorEvent) {
                // Client-side error
                errorMessage = `Error: ${error.error.message}`;
            } else {
                // Server-side error
                if (error.status === 0) {
                    errorMessage = 'No se pudo conectar con el servidor. Verifique que el backend esté ejecutándose.';
                } else {
                    errorMessage = error.error?.error || error.message || errorMessage;
                }
            }

            messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: errorMessage,
                life: 5000
            });

            return throwError(() => new Error(errorMessage));
        })
    );
};
