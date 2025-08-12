export enum Role {
  KEEPER = 'KEEPER',
  VET = 'VET',
  ADMIN = 'ADMIN',
}

export interface Staff {
  id: number;
  name: string;
  role: Role;
  phone: string | null;
  email: string | null;
  animalIds: number[];
}

export interface StaffCreate {
  name: string;
  role: Role;
  phone?: string | null;
  email?: string | null;
}
