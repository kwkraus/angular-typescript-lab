import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lab-not-found',
  imports: [RouterLink],
  template: `
    <h1>Page not found</h1>
    <p>That address doesn't match a page in the lab.</p>
    <a routerLink="/lessons">Back to lessons</a>
  `,
})
export class NotFound {}
