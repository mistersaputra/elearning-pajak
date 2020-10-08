import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditSubSideTheoryPage } from './edit-sub-side-theory.page';

describe('EditSubSideTheoryPage', () => {
  let component: EditSubSideTheoryPage;
  let fixture: ComponentFixture<EditSubSideTheoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubSideTheoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSubSideTheoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
