import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-registration',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  userForm: FormGroup;
  successMessage: string | null = null;

  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    });
  }

  submitForm() {

      this.http.post<any>('http://127.0.0.1:8000/api/users', this.userForm.value)
        .subscribe(
          (response) => {
            if (response.message === "Usuário criado com sucesso!") {
              this.router.navigate(['/login']);
            } else {
              this.successMessage = response.message;
            }
          },
          (error) => {
            if (error.status === 422 && error.error && error.error.errors) {
              // Se houver erros de validação retornados pelo servidor, exiba-os
              const errors = error.error.errors;
              let errorMessage = '';
              for (const field in errors) {
                if (errors.hasOwnProperty(field)) {
                  errorMessage += `${field}: ${errors[field]}\n`;
                }
              }
              this.successMessage = errorMessage;
            } else {
              console.error(error);
            }
          }
        );
    
  }
}
