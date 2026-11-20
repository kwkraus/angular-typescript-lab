import type { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  // This option lets a route parameter like :id feed an input named id.
  providers: [provideRouter(routes, withComponentInputBinding())],
};
