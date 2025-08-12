import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Diet, Gender, AnimalCreate, Animal } from '../../models/animal.model';
import { NgFor } from '@angular/common';

type DialogData = {mode: 'create' | 'edit'; animal?: Animal};

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule, NgFor,
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

    diets = Object.values(Diet);
    genders = Object.values(Gender);

    form = this.fb.nonNullable.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        type: ['', [Validators.required]],
        diet: this.fb.nonNullable.control<Diet>(Diet.OMNIVORE, {validators: [Validators.required]}),
        canWalk: this.fb.nonNullable.control<boolean>(true),
        canSwim: this.fb.nonNullable.control<boolean>(false),
        canFly:  this.fb.nonNullable.control<boolean>(false),
        age: this.fb.nonNullable.control<number>(0, {validators: [Validators.required, Validators.min(0), Validators.max(200)]}),
        gender: this.fb.nonNullable.control<Gender>(Gender.MALE, { validators: [Validators.required] }),
        color: ['', []],
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


