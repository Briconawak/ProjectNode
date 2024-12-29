import { TestBed } from '@angular/core/testing';
import { AccueilComponent } from './accueil.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AccueilComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Frontend' title`, () => {
    const fixture = TestBed.createComponent(AccueilComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Accueil');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AccueilComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Frontend');
  });
});