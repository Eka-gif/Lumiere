import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsByCategoryComponent } from './produits-by-category.component';

describe('ProduitsByCategoryComponent', () => {
  let component: ProduitsByCategoryComponent;
  let fixture: ComponentFixture<ProduitsByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitsByCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduitsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
