//Create TypeScript models that mirror your Spring Boot DTOs/entities, 
//so HTTP calls are type-safe and your templates get IntelliSense.

export enum Diet{
  CARNIVORE = 'CARNIVORE',
  HERBIVORE = 'HERBIVORE',
  OMNIVORE = 'OMNIVORE',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface Animal {
  id: number;
  name: string;
  type: string;
  diet: Diet;
  canWalk: boolean;
  canSwim: boolean;
  canFly: boolean;
  age: number;
  gender: Gender;
  color: string;
}

/** Create DTO (POST /api/animals) */
export type AnimalCreate = Omit<Animal, 'id'>;

/** Full update DTO (PUT /api/animals/{id}) */
export type AnimalUpdate = Omit<Animal, 'id'>;

/** Partial update DTO (PATCH /api/animals/{id}) */
export type AnimalPatch = Partial<Omit<Animal, 'id'>>;