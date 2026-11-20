export interface Lesson {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly source: string;
  readonly exercise: string;
}

export const LESSONS: readonly Lesson[] = [
  {
    id: 'startup',
    title: 'From HTML to Angular',
    summary: 'Follow the app from its HTML host to the root component and application configuration.',
    source: 'src/main.ts',
    exercise: 'Find the root component selector, then locate the matching element in index.html.',
  },
  {
    id: 'components',
    title: 'Components and bindings',
    summary: 'Pass a typed value into a child component, then listen for a typed event from it.',
    source: 'src/app/lessons/lesson-card.ts',
    exercise: 'Try binding a string to the completed input. Run the build to see the template error, then undo the change.',
  },
  {
    id: 'routing',
    title: 'URLs and the router',
    summary: 'See how one detail component handles different lessons by reading the URL parameter.',
    source: 'src/app/app.routes.ts',
    exercise: 'Change the lesson ID in the address bar to an unknown value. Compare that result with visiting /not-a-page.',
  },
  {
    id: 'services',
    title: 'Services and dependency injection',
    summary: 'Share progress across pages and the header without passing it through every component.',
    source: 'src/app/lessons/lesson-store.ts',
    exercise: 'Mark a lesson complete here, then return to the list. Refresh to see what in-memory state means.',
  },
];
