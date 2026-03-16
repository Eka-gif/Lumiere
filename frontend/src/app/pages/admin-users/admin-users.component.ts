import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];

  searchTerm: string = '';
  message: string = '';

  selectedUser: User | null = null;

  newUser: User = {
    username: '',
    password: '',
    role: 'ROLE_USER'
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }


  loadUsers(): void {

    this.userService.getUsers().subscribe({

      next: (data: User[]) => {
        this.users = data;
        this.filteredUsers = data;
      },

      error: (err) => {
        console.error(err);
        this.message = "Erreur lors du chargement des utilisateurs";
      }

    });

  }


  addUser(): void {

    if (!this.newUser.username || !this.newUser.password) {
      this.message = "Username et password obligatoires";
      return;
    }

    this.userService.addUser(this.newUser).subscribe({

      next: () => {

        this.message = "Utilisateur ajouté avec succès";

        this.newUser = {
          username: '',
          password: '',
          role: 'ROLE_USER'
        };

        this.loadUsers();

      },

      error: (err) => {

        console.error(err);
        this.message = "Erreur lors de l'ajout";

      }

    });

  }


  deleteUser(id?: number): void {

    if (!id) return;

    if (!confirm("Voulez-vous supprimer cet utilisateur ?")) return;

    this.userService.deleteUser(id).subscribe({

      next: () => {

        this.message = "Utilisateur supprimé";
        this.loadUsers();

      },

      error: (err) => {

        console.error(err);
        this.message = "Erreur lors de la suppression";

      }

    });

  }

  filterUsers(): void {

    const term = this.searchTerm.toLowerCase();

    this.filteredUsers = this.users.filter(user =>
      user.username.toLowerCase().includes(term)
    );

  }


  editUser(user: User): void {

    this.selectedUser = { ...user };

  }

  cancelEdit(): void {

    this.selectedUser = null;

  }

  updateUser(): void {

    if (!this.selectedUser || !this.selectedUser.id) return;

    this.userService.updateUser(this.selectedUser.id, this.selectedUser)
      .subscribe({

        next: () => {

          this.message = "Utilisateur modifié avec succès";
          this.selectedUser = null;
          this.loadUsers();

        },

        error: (err) => {

          console.error(err);
          this.message = "Erreur lors de la modification";

        }

      });

  }


  toggleUser(id?: number): void {

    if (!id) return;

    this.userService.toggleStatus(id).subscribe({

      next: () => {

        this.message = "Statut utilisateur modifié";
        this.loadUsers();

      },

      error: (err) => {

        console.error(err);
        this.message = "Erreur modification statut";

      }

    });

  }

}
