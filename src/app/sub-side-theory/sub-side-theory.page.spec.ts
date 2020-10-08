import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubSideTheoryPage } from './sub-side-theory.page';

describe('SubSideTheoryPage', () => {
  let component: SubSideTheoryPage;
  let fixture: ComponentFixture<SubSideTheoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubSideTheoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubSideTheoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
