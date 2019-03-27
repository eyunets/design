import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BurgersComponent } from './Burgers.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BurgersComponent', () => {
  let component: BurgersComponent;
  let fixture: ComponentFixture<BurgersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurgersComponent ],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurgersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
