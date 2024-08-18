import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventsListComponent } from './my-events-list.component';

describe('MyEventsListComponent', () => {
  let component: MyEventsListComponent;
  let fixture: ComponentFixture<MyEventsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyEventsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
