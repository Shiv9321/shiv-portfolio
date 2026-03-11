import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCornerComponent } from './first-corner.component';

describe('FirstCornerComponent', () => {
  let component: FirstCornerComponent;
  let fixture: ComponentFixture<FirstCornerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstCornerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
