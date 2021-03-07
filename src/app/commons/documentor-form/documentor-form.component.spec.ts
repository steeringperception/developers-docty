import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentorFormComponent } from './documentor-form.component';

describe('DocumentorFormComponent', () => {
  let component: DocumentorFormComponent;
  let fixture: ComponentFixture<DocumentorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
