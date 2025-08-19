import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalDetailPage } from '../../../../pages/animals/animal-detail.page/animal-detail.page';

describe('AnimalsDetail', () => {
  let component: AnimalDetailPage;
  let fixture: ComponentFixture<AnimalDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});