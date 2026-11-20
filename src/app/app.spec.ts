import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from './app';
import { appConfig } from './app.config';

describe('Angular TypeScript Lab', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(appConfig);
  });

  it('redirects home and keeps completion in sync across list, detail, and header', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const page: HTMLElement = fixture.nativeElement;

    fixture.detectChanges();
    await router.navigateByUrl('/');
    await fixture.whenStable();
    expect(router.url).toBe('/lessons');

    const startupButton = 'button[aria-label="Complete: From HTML to Angular"]';
    page.querySelector<HTMLButtonElement>(startupButton)?.click();
    await fixture.whenStable();
    expect(page.querySelector('[role="status"]')?.textContent).toContain('1 of 4 complete');

    await router.navigateByUrl('/lessons/startup');
    await fixture.whenStable();
    expect(page.querySelector('h1')?.textContent).toContain('From HTML to Angular');
    expect(page.querySelector(startupButton)?.getAttribute('aria-pressed')).toBe('true');

    page.querySelector<HTMLButtonElement>(startupButton)?.click();
    await router.navigateByUrl('/lessons');
    await fixture.whenStable();
    expect(page.querySelector(startupButton)?.getAttribute('aria-pressed')).toBe('false');
    expect(page.querySelector('[role="status"]')?.textContent).toContain('0 of 4 complete');
  });

  it('updates when a route parameter changes and distinguishes missing lessons from unknown pages', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const page: HTMLElement = fixture.nativeElement;
    fixture.detectChanges();

    for (const [url, heading] of [
      ['/lessons/startup', 'From HTML to Angular'],
      ['/lessons/routing', 'URLs and the router'],
      ['/lessons/missing', 'Lesson not found'],
      ['/missing', 'Page not found'],
    ]) {
      await router.navigateByUrl(url);
      await fixture.whenStable();
      expect(page.querySelector('h1')?.textContent).toContain(heading);
    }
  });
});
