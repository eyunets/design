import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Burger } from './burger';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const burgers = [
      {
        id: 11,
        name: 'Mr. Nice',
        composition: 'It’s big, it’s tasty and comes with two Chicken Selects, cheese made with Emmental, tomato, lettuce, onions, and our Big Tasty sauce® in a square cut bun.',
        img: './assets/img/burger-pic1.png',
        price: 10
      },
      {
        id: 12,
        name: 'Narco',
        composition: '100% British and Irish beef, a smoky BBQ sauce, bacon, coleslaw, cheddar cheese, red onion, lettuce, all in a soft brioche-style bun.',
        img: './assets/img/burger-pic2.png',
        price: 12
      },
      {
        id: 13,
        name: 'Bombasto',
        composition: 'Two 100% beef patties, a slice of cheese, lettuce, onion and pickles. And the sauce. That unbeatable, tasty Big Mac® sauce. You know you want to.',
        img: './assets/img/burger-pic3.png',
        price: 13
      },
      {
        id: 14,
        name: 'Celeritas',
        composition: 'Sometimes you just want to reach for a classic. A classic 100% beef patty, and cheese; with onions, pickles, mustard and a dollop of tomato ketchup, in a soft bun. Delicious.',
        img: './assets/img/burger-pic4.png',
        price: 13
      },
      {
        id: 15,
        name: 'Magneta',
        composition: 'Succulent chicken breast fillet in a crispy coating, with lettuce and Cool Mayo in a warm, toasted bakehouse roll. Simply delicious.',
        img: './assets/img/burger-pic5.png',
        price: 15
      },
      {
        id: 16,
        name: 'RubberMan',
        composition: 'Red pesto veggie goujons with sandwich sauce and shredded lettuce in a sesame topped bun.',
        img: './assets/img/burger-pic6.png',
        price: 15
      },
      {
        id: 17,
        name: 'Dynama',
        composition: "Try delicious grilled chicken breast pieces with garlic mayo, tomato, crisp lettuce and cucumber in a soft, toasted tortilla wrap. It's the bold taste your lunchtime needs. Wrap of the Day every Wednesday!'",
        img: './assets/img/burger-pic7.png',
        price: 16
      },
      {
        id: 18,
        name: 'Dr IQ',
        composition: 'Grilled chicken slices with a fiery buffalo sauce, Pepper Jack cheese, lettuce and red onion in a soft, toasted tortilla wrap. Wrap of the Day every Friday!',
        img: './assets/img/burger-pic8.png',
        price: 16
      },
      {
        id: 19,
        name: 'Magma',
        composition: 'Red pesto veggie goujons with spicy relish, tomato, lettuce and red onion in a soft, toasted tortilla wrap. Wrap of the Day every Monday!',
        img: './assets/img/burger-pic9.png',
        price: 13
      },
      {
        id: 20,
        name: 'Tornado',
        composition: 'Delicious white Hoki or Pollock fish in crispy breadcrumbs, with cheese and tartare sauce, in a steamed bun.',
        img: './assets/img/burger-pic10.png',
        price: 10
      }
    ];
    return { burgers };
  }

  // Overrides the genId method to ensure that a burger always has an id.
  // If the burgeres array is empty,
  // the method below returns the initial number (11).
  // if the burgeres array is not empty, the method below returns the highest
  // burger id + 1.
  genId(burgers: Burger[]): number {
    return burgers.length > 0
      ? Math.max(...burgers.map(burger => burger.id)) + 1
      : 11;
  }
}
