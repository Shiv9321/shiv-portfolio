import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdCornerComponent } from './third-corner.component';

describe('ThirdCornerComponent', () => {
  let component: ThirdCornerComponent;
  let fixture: ComponentFixture<ThirdCornerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdCornerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
