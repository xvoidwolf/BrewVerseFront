import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './security/auth-interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    }),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
    provideHttpClient((withInterceptors([authInterceptor])))]
};
