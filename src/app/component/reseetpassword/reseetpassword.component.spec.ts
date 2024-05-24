import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseetpasswordComponent } from './reseetpassword.component';

describe('ReseetpasswordComponent', () => {
  let component: ReseetpasswordComponent;
  let fixture: ComponentFixture<ReseetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReseetpasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReseetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
