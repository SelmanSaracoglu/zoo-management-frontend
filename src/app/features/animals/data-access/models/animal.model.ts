//Create TypeScript models that mirror your Spring Boot DTOs/entities, 
//so HTTP calls are type-safe and your templates get IntelliSense.

export type Diet = 'CARNIVORE' | 'HERBIVORE' | 'OMNIVORE';
export type Gender = 'MALE' | 'FEMALE';

export interface Animal {
  id: number;
  name: string;
  species: string;
  habitat: string;
  diet: Diet;
  originCountry: string;
  age: number;
  gender: Gender;
  canSwim: boolean;
  canFly: boolean;
}

/** Create DTO (POST /api/animals) */
export type AnimalCreate = Omit<Animal, 'id'>;

/** Full update DTO (PUT /api/animals/{id}) */
export type AnimalUpdate = Omit<Animal, 'id'>;

/** Partial update DTO (PATCH /api/animals/{id}) */
export type AnimalPatch = Partial<Omit<Animal, 'id'>>;