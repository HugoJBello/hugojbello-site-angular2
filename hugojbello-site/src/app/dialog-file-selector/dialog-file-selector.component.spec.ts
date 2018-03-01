import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFileSelectorComponent } from './dialog-file-selector.component';

describe('DialogFileSelectorComponent', () => {
  let component: DialogFileSelectorComponent;
  let fixture: ComponentFixture<DialogFileSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFileSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFileSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
