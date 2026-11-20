# Angular TypeScript Lab

A small learning app you can read end to end before tackling a larger Angular codebase. Open a lesson, try its exercise, and mark it complete from the list or detail page. The header updates in both places. Progress lives in memory and resets on refresh; there is no backend.

## Run locally

This lab pins Angular and Angular CLI to **22.3.0**, the latest stable release when checked on November 20, 2026 ([Angular release](https://github.com/angular/angular/releases/tag/v22.3.0), [CLI release](https://github.com/angular/angular-cli/releases/tag/v22.3.0)). The [official compatibility table](https://angular.dev/reference/versions) lists Node.js `^22.22.3 || ^24.15.0 || ^26.0.0` and TypeScript `>=6.0.0 <6.1.0`. Use Node 24.15.0 or a newer 24.x release if you want to use that LTS line. npm installs the local Angular CLI and TypeScript, so no global Angular CLI is needed.

```shell
git clone https://github.com/kwkraus/angular-typescript-lab.git
cd angular-typescript-lab
npm install
npm start
```

Open [localhost:4200](http://localhost:4200). Run `npm test` for routing and progress tests, or `npm run build` for a production build and template type checking.

## Read the code in this order

| Start here | What to look for |
| --- | --- |
| [`src/index.html`](src/index.html), [`src/main.ts`](src/main.ts) | The HTML host, the browser entry point, and `bootstrapApplication`. |
| [`app.config.ts`](src/app/app.config.ts), [`app.routes.ts`](src/app/app.routes.ts), [`app.html`](src/app/app.html) | Application-wide providers, URL matching, and the outlet that displays the active page. |
| [`lesson.ts`](src/app/lessons/lesson.ts), [`lesson-list.html`](src/app/lessons/lesson-list.html), [`lesson-card.ts`](src/app/lessons/lesson-card.ts), [`lesson-card.html`](src/app/lessons/lesson-card.html) | A TypeScript interface, `@for`, typed inputs and outputs, and bindings between parent and child. |
| [`lesson-detail.ts`](src/app/lessons/lesson-detail.ts), [`lesson-detail.html`](src/app/lessons/lesson-detail.html) | A route parameter feeds a signal input; `@if` handles the optional lookup result. |
| [`lesson-store.ts`](src/app/lessons/lesson-store.ts) | Dependency injection, an in-memory signal, and a derived count using `computed`. |

### Follow one visit and one click

1. The browser requests the HTML page. The CLI serves HTML with the JavaScript built from `src/main.ts`. That entry point calls `bootstrapApplication(App, appConfig)`. Angular creates the root injector, applies the configuration, and mounts `App` in `<lab-root>`. The components are standalone: their `imports` tell Angular which components and directives their templates use, without an `AppModule`.
2. The router redirects `/` to `/lessons`. Clicking a lesson's `RouterLink` changes the URL without reloading the document. The router places `LessonDetail` in `<router-outlet>` and binds `:id` to its `id` input. Visiting `/lessons/missing` matches the detail route but finds no lesson; `/missing` matches the wildcard route instead. A deployed single-page app needs a host configured to serve `index.html` for direct visits to client routes.
3. On the list, `[lesson]` and `[completed]` pass values into a card. Inside the card, `{{ lesson().title }}` renders text and `(click)` emits a typed `Lesson`. The parent receives it as `$event` in `(completionToggled)` and calls `store.toggle($event)`.
4. The list, detail page, and header call `inject(LessonStore)` and get the same root-provided instance. The store updates its signal with a new set of IDs. Angular updates the templates that read the signal, including the header's `computed` count. No API request is involved.

### See TypeScript catch a mistake

In [`lesson-list.html`](src/app/lessons/lesson-list.html), temporarily replace the `[completed]` value with `'yes'` (use `[completed]="'yes'"`). Run `npm run build`: Angular's `strictTemplates` checks the binding against the child's `input.required<boolean>()`, so the string should fail the build. Undo the change afterward. The `Lesson` interface and `output<Lesson>()` similarly let the editor and compiler check what a card sends to its parent. Those types are compile-time checks, not runtime validation of outside data.

## Extend it next

- Add a fifth entry to the lesson catalog and trace how it appears in the list and gets its own URL without a new route. Update the test expectations for the new total.
- When ready for a Node.js API, start with `GET /api/lessons`. Register `provideHttpClient()` in `app.config.ts`, use an Angular service to fetch the catalog, and show separate loading, error, and empty states. Validate incoming JSON: `HttpClient.get<Lesson[]>()` does not validate the response at runtime.
- Give the API base URL a typed injection token. Compare an Angular CLI build configuration with runtime configuration loaded at startup, and try a local dev-server proxy for `/api`. Browser configuration is public; keep secrets on the server.
