import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface User {
  id?: number; // Tornar a propriedade 'id' opcional
  email: string;
  password: string;
}

interface LoginResponse {
  success: number;
  message: string;
  user?: User;
}

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = {
    email: '',
    password: ''
  };
  errorMessage: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  submitForm() {
    this.http.post<LoginResponse>('http://127.0.0.1:8000/api/login', this.user)
      .subscribe(
        (response) => {
          if (response.success === 1 && response.user) {
            this.errorMessage = null;
            const idUser = response.user.id;
            // Redirect to dashboard or any other page after successful login
            const navigationExtras: NavigationExtras = {
              queryParams: { id: idUser } // Passar o parâmetro 'id'
            };
            this.router.navigate(['/dashboard'], navigationExtras);
          } else {
            this.errorMessage = response.message;
          }
        },
        (error) => {
          this.errorMessage = "*Credenciais incorretas*";
        }
      );
  }
}
