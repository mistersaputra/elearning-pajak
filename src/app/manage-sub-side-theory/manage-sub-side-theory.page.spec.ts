import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageSubSideTheoryPage } from './manage-sub-side-theory.page';

describe('ManageSubSideTheoryPage', () => {
  let component: ManageSubSideTheoryPage;
  let fixture: ComponentFixture<ManageSubSideTheoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSubSideTheoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageSubSideTheoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
