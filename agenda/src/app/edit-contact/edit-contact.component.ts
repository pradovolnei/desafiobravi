import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';


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
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contactForm: FormGroup;
  contactId!: number;
  contact!: Contact;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private location: Location
  ) {
    this.contactForm = this.formBuilder.group({
      contact_name: ['', Validators.required],
      phone: ['', Validators.required],
      whatsapp: ['', Validators.required],
      email: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contactId = +params['id'];
      this.getContactData(this.contactId);
    });
  }

  getContactData(id: number) {
    //const url = `http://127.0.0.1:8000/api/contacts/${id}`;
    const url = `http://127.0.0.1:8000/api/contact/${id}`;
    this.http.get(url).subscribe(
      (response: any) => {
        const contactData = {
          contact_name: response.contact_name,
          phone: response.phone,
          whatsapp: response.whatsapp,
          email: response.email
        };
        this.contactForm.patchValue(contactData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submitContactForm() {
    if (this.contactForm.valid) {
      const url = `http://127.0.0.1:8000/api/contacts/${this.contactId}`;
      const updatedContact = {
        ...this.contact,
        ...this.contactForm.value
      };
      this.http.put<Contact>(url, updatedContact).subscribe(
        () => {
          // Atualização bem-sucedida
          // Redirecionar para a página de detalhes do contato
          //this.router.navigate(['/contact-details', this.contactId]);
          this.location.back();
        },
        (error) => {
          console.log(error);
          // Lidar com erro de atualização
        }
      );
    }
  }
}
