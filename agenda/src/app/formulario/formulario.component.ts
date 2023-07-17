import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface User {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  user: User = {
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  };
  successMessage: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  submitForm() {
    this.http.post<any>('http://127.0.0.1:8000/api/users', this.user)
      .subscribe(
        (response) => {
          response.message == "Usuário criado com sucesso!" ? this.router.navigate(['/login']) : this.successMessage = response.message;
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
