import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaperWorkPage } from './paper-work.page';

describe('PaperWorkPage', () => {
  let component: PaperWorkPage;
  let fixture: ComponentFixture<PaperWorkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperWorkPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaperWorkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
