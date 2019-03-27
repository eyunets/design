import { Burger } from './burger';
export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  burgers: Array<Burger>;
}
