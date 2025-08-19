import { Component, ChangeDetectionStrategy, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AnimalCreate } from '../../features/animals/data-access/models/animal.model';
import { Animal } from '../../features/animals/data-access/models/animal.model';


export interface AnimalDialogData { mode: 'create'|'edit'; animal?: Animal; }

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatSelectModule,
  ],
  templateUrl: './animal-dialog.component.html',
  styleUrls: ['./animal-dialog.component.scss']
})



export class AnimalDialogComponent {
  data = inject(MAT_DIALOG_DATA) as AnimalDialogData;
  ref = inject(MatDialogRef<AnimalDialogComponent, any>);
  private fb = inject(FormBuilder);

  // ✅ String literal seçenekleri — Diet/Gender tip hatasını bitirir
  readonly diets   = ['CARNIVORE', 'HERBIVORE', 'OMNIVORE'] as const;
  readonly genders = ['MALE', 'FEMALE'] as const;


    form = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      habitat: [''],
      // Eğer MatSelect ile liste kullanıyorsan string kontrol uygun
      diet: this.fb.nonNullable.control<string>('OMNIVORE', { validators: [Validators.required] }),
      originCountry: [''],
      age: [null as number | null],
      gender: this.fb.nonNullable.control<string>('MALE', { validators: [Validators.required] }),
      canSwim: [false],
      canFly: [false],
    });

    constructor(){
      const a = this.data?.animal;
      if (a) {
        this.form.patchValue({
        name: a.name ?? '',
        species: a.species ?? '',
        habitat: a.habitat ?? '',
        diet: a.diet ?? '',
        originCountry: a.originCountry ?? '',
        age: a.age ?? null,
        gender: a.gender ?? '',
        canSwim: !!a.canSwim,
        canFly: !!a.canFly,
      });
    }
  }

  get isEdit(): boolean {
  return this.data?.mode === 'edit';
}
    
    save()   { if (this.form.valid) this.ref.close(this.form.value); }
    cancel() { this.ref.close(null); }
      
}

