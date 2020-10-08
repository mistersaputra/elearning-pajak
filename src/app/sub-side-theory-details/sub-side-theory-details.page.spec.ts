import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubSideTheoryDetailsPage } from './sub-side-theory-details.page';

describe('SubSideTheoryDetailsPage', () => {
  let component: SubSideTheoryDetailsPage;
  let fixture: ComponentFixture<SubSideTheoryDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubSideTheoryDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubSideTheoryDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
