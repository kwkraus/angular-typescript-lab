import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

// Start with a standalone root component and application-wide providers.
bootstrapApplication(App, appConfig).catch((error: unknown) => console.error(error));
