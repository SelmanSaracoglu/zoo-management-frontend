import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Diet, Gender, AnimalCreate, Animal } from '../../features/animals/data-access/models/animal.model';
import { NgFor, NgIf } from '@angular/common';

type DialogData = {mode: 'create' | 'edit'; animal?: Animal};

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule, NgFor, NgIf,
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatCheckboxModule, MatButtonModule
  ],
  templateUrl: './animal-dialog.component.html',
  styleUrls: ['./animal-dialog.component.scss']
})

export class AnimalDialogComponent {
    private fb = inject(FormBuilder);
    private ref = inject(MatDialogRef<AnimalDialogComponent, AnimalCreate | null>);
    data = inject<DialogData>(MAT_DIALOG_DATA, {optional:true}) ?? { mode:'create' }

  // Union string types olduğu için sabit diziler kullan
  readonly diets: Diet[] = ['CARNIVORE', 'HERBIVORE', 'OMNIVORE'];
  readonly genders: Gender[] = ['MALE', 'FEMALE'];

    form = this.fb.nonNullable.group({
      name: this.fb.nonNullable.control('', { validators: [Validators.required, Validators.minLength(2)] }),
      species: this.fb.nonNullable.control('', { validators: [Validators.required] }),
      habitat: this.fb.nonNullable.control('', { validators: [Validators.required] }),
      diet: this.fb.nonNullable.control<Diet>('OMNIVORE', { validators: [Validators.required] }),
      originCountry: this.fb.nonNullable.control('', { validators: [Validators.required] }),
      age: this.fb.nonNullable.control(0, { validators: [Validators.required, Validators.min(0), Validators.max(200)] }),
      gender: this.fb.nonNullable.control<Gender>('MALE', { validators: [Validators.required] }),
      canSwim: this.fb.nonNullable.control(false),
      canFly: this.fb.nonNullable.control(false),
    });

    get title() {
        return this.data?.mode === 'edit' ? 'Edit_Animal' : 'Add Animal';
    }

    constructor() {
    // If edit mode, patch values (we’ll use this in Step 3C.2)
    if (this.data?.mode === 'edit' && this.data.animal) {
      const { id, ...rest } = this.data.animal;
      this.form.patchValue(rest);
        }
    }
    
    save() {
    if (this.form.invalid) return;
    const payload: AnimalCreate = this.form.getRawValue();
    this.ref.close(payload);
    }
    cancel() {
    this.ref.close(null);
    }
        
}


