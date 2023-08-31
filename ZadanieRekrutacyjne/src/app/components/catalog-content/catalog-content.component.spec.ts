import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogContentComponent } from './catalog-content.component';

describe('CatalogContentComponent', () => {
  let component: CatalogContentComponent;
  let fixture: ComponentFixture<CatalogContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogContentComponent]
    });
    fixture = TestBed.createComponent(CatalogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
