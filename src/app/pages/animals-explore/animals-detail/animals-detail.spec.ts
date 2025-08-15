import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsDetail } from './animals-detail';

describe('AnimalsDetail', () => {
  let component: AnimalsDetail;
  let fixture: ComponentFixture<AnimalsDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalsDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalsDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
