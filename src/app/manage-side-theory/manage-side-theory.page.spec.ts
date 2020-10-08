import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageSideTheoryPage } from './manage-side-theory.page';

describe('ManageSideTheoryPage', () => {
  let component: ManageSideTheoryPage;
  let fixture: ComponentFixture<ManageSideTheoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSideTheoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageSideTheoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
