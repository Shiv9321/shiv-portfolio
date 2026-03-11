import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondCornerComponent } from './second-corner.component';

describe('SecondCornerComponent', () => {
  let component: SecondCornerComponent;
  let fixture: ComponentFixture<SecondCornerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondCornerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
