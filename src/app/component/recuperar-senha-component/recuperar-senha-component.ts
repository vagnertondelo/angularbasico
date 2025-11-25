import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-recuperar-senha-component',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './recuperar-senha-component.html',
  styleUrl: './recuperar-senha-component.css'
})
export class RecuperarSenhaComponent {
    email ='';
    loading = false;
    ok='';
    erro='';

}
