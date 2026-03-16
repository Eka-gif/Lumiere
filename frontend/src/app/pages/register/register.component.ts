import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormsModule} from "@angular/forms";
import {RouterLink, Router} from "@angular/router";
import {NgIf} from "@angular/common";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    username: '',
    password: ''
  }

  message = ''
  showPassword: boolean = false;
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
  }

  register(){

    if(this.user.password !== this.confirmPassword){
      this.toastr.warning("Les mots de passe ne correspondent pas");
      return;
    }

    this.authService.register(this.user).subscribe({

      next: (res) => {
        console.log("SUCCESS", res);
        this.toastr.success("Compte créé avec succès");

        setTimeout(()=>{
          this.router.navigate(['/login']);
        },1500);

      },

      error: (err) => {
        console.log("ERROR", err);
        this.toastr.error("Erreur lors de la création du compte");
      }

    });

  }

}

