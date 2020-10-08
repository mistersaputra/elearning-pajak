import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SideTheoryPage } from './side-theory.page';

describe('SideTheoryPage', () => {
  let component: SideTheoryPage;
  let fixture: ComponentFixture<SideTheoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideTheoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SideTheoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
