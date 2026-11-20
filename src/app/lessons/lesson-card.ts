import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Lesson } from './lesson';

@Component({
  selector: 'lab-lesson-card',
  imports: [RouterLink],
  templateUrl: './lesson-card.html',
})
export class LessonCard {
  readonly lesson = input.required<Lesson>();
  readonly completed = input.required<boolean>();
  // Emit the lesson so the parent owns the decision to change shared state.
  readonly completionToggled = output<Lesson>();
}
