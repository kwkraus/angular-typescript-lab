import { computed, Injectable, signal } from '@angular/core';
import { LESSONS, type Lesson } from './lesson';

@Injectable({ providedIn: 'root' })
export class LessonStore {
  readonly lessons = LESSONS;
  private readonly completedIds = signal<ReadonlySet<string>>(new Set());
  readonly completedCount = computed(() => this.completedIds().size);

  find(id: string | undefined): Lesson | undefined {
    return this.lessons.find((lesson) => lesson.id === id);
  }

  isComplete(id: string): boolean {
    return this.completedIds().has(id);
  }

  toggle(lesson: Lesson): void {
    this.completedIds.update((ids) => {
      // Return a new reference so the signal can detect the change.
      const next = new Set(ids);
      if (next.has(lesson.id)) {
        next.delete(lesson.id);
      } else {
        next.add(lesson.id);
      }
      return next;
    });
  }
}
