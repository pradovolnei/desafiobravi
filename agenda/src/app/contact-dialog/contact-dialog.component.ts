import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';


interface Contact {
  contact_name: string;
  phone: string;
  whatsapp: string;
  email: string;
}

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css']
})
export class ContactDialogComponent {
  newContact: Contact = {
    contact_name: '',
    phone: '',
    whatsapp: '',
    email: ''
  };

  constructor(
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  submitContactForm() {
    // Enviar o formulário para o endpoint de criação de contatos
    const url = `http://127.0.0.1:8000/api/contacts/${this.data.user_id}`;
    this.http.post<Contact>(url, this.newContact).subscribe(
      (response) => {
        // Fechar o diálogo/modal e passar o resultado (true) para o componente pai
        this.dialogRef.close(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  closeDialog() {
    // Fechar o diálogo/modal e passar o resultado (false) para o componente pai
    this.dialogRef.close(false);
  }
}

