import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Output() switchToSignupForm = new EventEmitter<void>();
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.errorMessage = '';
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: () => {
          console.log('Logged in');
          this.loginForm.reset();

          // ✅ Close login sidebar
          const loginSidebar = document.getElementById('loginSidebar');
          if (loginSidebar) {
            bootstrap.Offcanvas.getInstance(loginSidebar)?.hide();
          }

          // ✅ Close signup sidebar if open
          const signupSidebar = document.getElementById('signupSidebar');
          if (signupSidebar) {
            bootstrap.Offcanvas.getInstance(signupSidebar)?.hide();
          }
        },
        error: (err) => {
          console.error('Full error object:', JSON.stringify(err, null, 2));

          const errorCode =
            err?.error?.error?.message ||
            err?.error?.message ||
            err?.code ||
            err?.message ||
            'unknown';

          if (
            errorCode === 'auth/user-not-found' ||
            errorCode === 'auth/wrong-password' ||
            errorCode === 'EMAIL_NOT_FOUND' ||
            errorCode === 'INVALID_PASSWORD'
          ) {
            this.errorMessage = 'Invalid email or password.';
          } else {
            this.errorMessage = 'Invalid email or password.';
          }
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  switchToSignup(event: Event) {
    event.preventDefault();
    this.switchToSignupForm.emit();

    const loginCanvas = document.getElementById('loginSidebar');
    const signupCanvas = document.getElementById('signupSidebar');

    if (loginCanvas && signupCanvas) {
      bootstrap.Offcanvas.getInstance(loginCanvas)?.hide();
      new bootstrap.Offcanvas(signupCanvas, { backdrop: false }).show();
    }
  }
  // ====================================
  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe({
      next: (result) => {
        console.log('Google login successful', result);

        // Close the sidebar after successful login
        const loginSidebar = document.getElementById('loginSidebar');
        if (loginSidebar) {
          bootstrap.Offcanvas.getInstance(loginSidebar)?.hide();
        }
        window.location.reload();
      },
      error: (error) => {
        console.error('Google login error:', error);
        this.errorMessage = 'Google login failed. Please try again.';
      },
    });
  }
}
