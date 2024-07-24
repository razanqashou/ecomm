import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IsignUp } from '../../../interfaces/singup';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
}
