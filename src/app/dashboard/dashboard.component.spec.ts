import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { BurgerSearchComponent } from '../burger-search/burger-search.component';

import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BURGERS } from '../mock-burgers';
import { BurgerService } from '../burger.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let burgerService;
  let getBurgeresSpy;

  beforeEach(async(() => {
    burgerService = jasmine.createSpyObj('BurgerService', ['getBurgeres']);
    getBurgeresSpy = burgerService.getBurgeres.and.returnValue( of(BURGERS) );
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        BurgerSearchComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: BurgerService, useValue: burgerService }
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Burgeres" as headline', () => {
    expect(fixture.nativeElement.querySelector('h3').textContent).toEqual('Top Burgeres');
  });

  it('should call burgerService', async(() => {
    expect(getBurgeresSpy.calls.any()).toBe(true);
    }));

  it('should display 4 links', async(() => {
    expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
  }));

});
