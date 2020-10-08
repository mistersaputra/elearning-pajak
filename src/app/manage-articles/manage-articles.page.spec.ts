import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageArticlesPage } from './manage-articles.page';

describe('ManageArticlesPage', () => {
  let component: ManageArticlesPage;
  let fixture: ComponentFixture<ManageArticlesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageArticlesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageArticlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
