import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsExplore } from './animals-explore';

describe('AnimalsExplore', () => {
  let component: AnimalsExplore;
  let fixture: ComponentFixture<AnimalsExplore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalsExplore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalsExplore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
