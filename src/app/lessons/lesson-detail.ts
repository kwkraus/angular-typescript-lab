import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LessonStore } from './lesson-store';

@Component({
  selector: 'lab-lesson-detail',
  imports: [RouterLink],
  templateUrl: './lesson-detail.html',
})
export class LessonDetail {
  readonly id = input<string>();
  protected readonly store = inject(LessonStore);
  // Read the input reactively; Angular may reuse this component for a new ID.
  protected readonly lesson = computed(() => this.store.find(this.id()));
}
