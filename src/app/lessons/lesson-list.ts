import { Component, inject } from '@angular/core';
import { LessonCard } from './lesson-card';
import { LessonStore } from './lesson-store';

@Component({
  selector: 'lab-lesson-list',
  imports: [LessonCard],
  templateUrl: './lesson-list.html',
})
export class LessonList {
  // The list and the detail page both receive the same root-provided instance.
  protected readonly store = inject(LessonStore);
}
