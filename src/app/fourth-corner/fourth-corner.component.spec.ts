import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthCornerComponent } from './fourth-corner.component';

describe('FourthCornerComponent', () => {
  let component: FourthCornerComponent;
  let fixture: ComponentFixture<FourthCornerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourthCornerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourthCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
