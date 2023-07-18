import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon'; // Importação adicionada

interface Contact {
  id: number;
  user_id: number;
  contact_name: string;
  phone: string;
  whatsapp: string;
  email: string | null;
  created_at: string;
  updated_at: string | null;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  id: number | null = null;
  contacts: Contact[] = [];
  newContact: Contact = {
    id: 0,
    user_id: 0,
    contact_name: '',
    phone: '',
    whatsapp: '',
    email: null,
    created_at: '',
    updated_at: null
  };

  @ViewChild('contactForm') contactForm!: NgForm;
  dialogOpen = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, public dialog: MatDialog) {}
  

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'] ? +params['id'] : null;
      if (this.id !== null) {
        this.getContacts(this.id as number);
      }
    });
  }

  getContacts(id: number) {
    const url = `http://127.0.0.1:8000/api/contacts/${id}`;
    this.http.get<Contact[]>(url).subscribe(
      (response) => {
        this.contacts = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openContactDialog() {
    if (!this.dialogOpen) {
      this.dialogOpen = true;
      const dialogRef = this.dialog.open(ContactDialogComponent, {
        width: '400px',
        data: { user_id: this.id }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.dialogOpen = false;
        if (result) {
          this.getContacts(this.id as number);
        }
      });
    }
  }

  submitContactForm() {
    if (this.contactForm.valid) {
      const url = `http://127.0.0.1:8000/api/contacts/${this.id}`;
      this.http.post<Contact>(url, this.newContact).subscribe(
        (response) => {
          this.contactForm.resetForm();
          this.getContacts(this.id as number);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteContact(id: number) {
    const url = `http://127.0.0.1:8000/api/contacts/${id}`;
    this.http.delete(url).subscribe(
      () => {
        // Exclusão bem-sucedida
        // Atualize a lista de contatos após a exclusão
        this.getContacts(this.id as number);
      },
      (error) => {
        console.log(error);
        // Lidar com erro de exclusão
      }
    );
  }
}
