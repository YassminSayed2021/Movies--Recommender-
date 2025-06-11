import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
declare var bootstrap: any;

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() switchToLoginForm = new EventEmitter<void>();
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  close() {
    this.closeModal.emit();
  }

  switchToLogin(event: Event) {
    event.preventDefault();
    this.switchToLoginForm.emit();

    const signupCanvas = document.getElementById('signupSidebar');
    const loginCanvas = document.getElementById('loginSidebar');

    if (signupCanvas && loginCanvas) {
      const bsSignup =
        bootstrap.Offcanvas.getInstance(signupCanvas) ||
        new bootstrap.Offcanvas(signupCanvas);
      const bsLogin =
        bootstrap.Offcanvas.getInstance(loginCanvas) ||
        new bootstrap.Offcanvas(loginCanvas);

      bsSignup.hide();
      bsLogin.show();
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.errorMessage = '';

      const { email, password, firstName } = this.signupForm.value;

      this.authService.register(email, password, firstName).subscribe({
        next: () => {
          console.log('User registered');
          this.signupForm.reset();
          this.switchToLoginForm.emit();

          const signupCanvas = document.getElementById('signupSidebar');
          if (signupCanvas) {
            const bsSignup =
              bootstrap.Offcanvas.getInstance(signupCanvas) ||
              new bootstrap.Offcanvas(signupCanvas);
            bsSignup.hide();
          }

          const loginCanvas = document.getElementById('loginSidebar');
          if (loginCanvas) {
            const bsLogin =
              bootstrap.Offcanvas.getInstance(loginCanvas) ||
              new bootstrap.Offcanvas(loginCanvas);
            bsLogin.show();
          }
        },
        error: (err) => {
          console.error('Firebase registration error:', err);
          if (err.code === 'auth/email-already-in-use') {
            this.errorMessage = 'This email is already in use.';
          } else {
            this.errorMessage = 'Something went wrong. Please try again.';
          }
        },
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
