import type { Routes } from '@angular/router';
import { LessonDetail } from './lessons/lesson-detail';
import { LessonList } from './lessons/lesson-list';
import { NotFound } from './not-found';

export const routes: Routes = [
  // Match only the empty URL here, not every URL starting with an empty prefix.
  { path: '', pathMatch: 'full', redirectTo: 'lessons' },
  { path: 'lessons', component: LessonList, title: 'Lessons | Angular TypeScript Lab' },
  { path: 'lessons/:id', component: LessonDetail, title: 'Lesson | Angular TypeScript Lab' },
  { path: '**', component: NotFound, title: 'Page not found | Angular TypeScript Lab' },
];
