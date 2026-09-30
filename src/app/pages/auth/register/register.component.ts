import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideIconComponent } from '../../../shared/icon/lucide-icon.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideIconComponent],
  template: `
    <!-- Split-Screen Design as required in Section 23 -->
    <div class="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white text-[#17202A]">
      
      <!-- LEFT: LARGE TRAVEL IMAGE (5 Cols on Desktop) -->
      <div class="hidden lg:block lg:col-span-5 xl:col-span-6 relative bg-[#0B1320] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=80"
          alt="World Expedition"
          class="w-full h-full object-cover opacity-85"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/30 to-black/30"></div>

        <!-- Brand Watermark on Image -->
        <div class="absolute top-10 left-10 z-10">
          <a routerLink="/" class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-full bg-[#D4A359] text-[#071F22] font-black text-xl flex items-center justify-center font-display shadow-md">
              T
            </div>
            <span class="text-2xl font-bold font-display text-white tracking-tight">
              TripSphere
            </span>
          </a>
        </div>

        <!-- Editorial Text on Image -->
        <div class="absolute bottom-12 left-10 right-10 text-white space-y-3 z-10">
          <span class="text-xs font-bold uppercase tracking-widest text-[#D4A359]">
            MEMBERSHIP PRIVILEGES
          </span>
          <blockquote class="text-2xl font-display font-medium text-white/95 leading-relaxed">
            “Join thousands of modern explorers architecting unforgettable journeys worldwide.”
          </blockquote>
          <p class="text-xs text-white/70">
            Exclusive Rates • Custom Itineraries • Real-Time Budget Tracking
          </p>
        </div>
      </div>

      <!-- RIGHT: AUTHENTICATION FORM (7 Cols on Desktop) -->
      <div class="lg:col-span-7 xl:col-span-6 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[#F8F7F3]">
        <div class="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-10 border border-[#EFEDE7] shadow-xl space-y-7 animate-fade-in">
          
          <!-- Mobile Brand Logo -->
          <div class="lg:hidden flex justify-center pb-1">
            <a routerLink="/" class="flex items-center gap-2">
              <div class="w-9 h-9 rounded-full bg-[#D4A359] text-[#071F22] font-black text-lg flex items-center justify-center font-display shadow-sm">
                T
              </div>
              <span class="text-xl font-bold font-display text-[#071F22]">
                TripSphere
              </span>
            </a>
          </div>

          <!-- Heading -->
          <div class="space-y-1 text-center sm:text-left">
            <h2 class="text-2xl sm:text-3xl font-bold font-display text-[#071F22]">
              Create your account
            </h2>
            <p class="text-xs sm:text-sm text-[#6B7280] font-light">
              Fill in your details to begin crafting bespoke journeys.
            </p>
          </div>

          <!-- Error Alert -->
          @if (errorMessage) {
            <div class="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold">
              {{ errorMessage }}
            </div>
          }

          <!-- Form (First Name, Last Name, Email, Phone, Password, Confirm Password) -->
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
            
            <!-- First Name & Last Name Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280]">First Name</label>
                <input
                  type="text"
                  formControlName="firstName"
                  placeholder="Alex"
                  class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#D4A359] focus:ring-1 focus:ring-[#D4A359]"
                />
                @if (registerForm.get('firstName')?.touched && registerForm.get('firstName')?.invalid) {
                  <p class="text-[11px] text-rose-500">First name required</p>
                }
              </div>

              <div class="space-y-1">
                <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280]">Last Name</label>
                <input
                  type="text"
                  formControlName="lastName"
                  placeholder="Mercer"
                  class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#D4A359] focus:ring-1 focus:ring-[#D4A359]"
                />
                @if (registerForm.get('lastName')?.touched && registerForm.get('lastName')?.invalid) {
                  <p class="text-[11px] text-rose-500">Last name required</p>
                }
              </div>
            </div>

            <!-- Email -->
            <div class="space-y-1">
              <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280]">Email Address</label>
              <div class="relative">
                <app-icon name="mail" [size]="16" extraClass="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]"></app-icon>
                <input
                  type="email"
                  formControlName="email"
                  placeholder="alex.mercer@tripsphere.travel"
                  class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#D4A359] focus:ring-1 focus:ring-[#D4A359]"
                />
              </div>
              @if (registerForm.get('email')?.touched && registerForm.get('email')?.invalid) {
                <p class="text-[11px] text-rose-500">Valid email required</p>
              }
            </div>

            <!-- Phone -->
            <div class="space-y-1">
              <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280]">Phone</label>
              <div class="relative">
                <app-icon name="phone" [size]="16" extraClass="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]"></app-icon>
                <input
                  type="tel"
                  formControlName="phone"
                  placeholder="+1 (555) 234-5678"
                  class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#D4A359] focus:ring-1 focus:ring-[#D4A359]"
                />
              </div>
              @if (registerForm.get('phone')?.touched && registerForm.get('phone')?.invalid) {
                <p class="text-[11px] text-rose-500">Phone number required</p>
              }
            </div>

            <!-- Password & Confirm Password Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280]">Password</label>
                <input
                  type="password"
                  formControlName="password"
                  placeholder="••••••••"
                  class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#D4A359] focus:ring-1 focus:ring-[#D4A359]"
                />
                @if (registerForm.get('password')?.touched && registerForm.get('password')?.invalid) {
                  <p class="text-[11px] text-rose-500">Min 6 characters</p>
                }
              </div>

              <div class="space-y-1">
                <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280]">Confirm Password</label>
                <input
                  type="password"
                  formControlName="confirmPassword"
                  placeholder="••••••••"
                  class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#D4A359] focus:ring-1 focus:ring-[#D4A359]"
                />
                @if (registerForm.hasError('mismatch') && registerForm.get('confirmPassword')?.touched) {
                  <p class="text-[11px] text-rose-500">Passwords do not match</p>
                }
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="registerForm.invalid"
              class="w-full py-3.5 rounded-xl bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#0A2D30] disabled:opacity-50 text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer mt-2"
            >
              Create Account
            </button>
          </form>

          <!-- Login Link -->
          <div class="pt-4 border-t border-slate-200 text-center text-xs text-[#6B7280]">
            Already have an account?
            <a routerLink="/login" class="font-bold text-[#0A2D30] hover:text-[#D4A359] hover:underline ml-1">
              Sign In
            </a>
          </div>

        </div>
      </div>

    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = '';

  registerForm: FormGroup = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.registerForm.valid) {
      const { firstName, lastName, email, phone, password } = this.registerForm.value;
      const fullName = `${firstName} ${lastName}`.trim();
      const success = this.authService.register({
        fullName,
        email,
        phone,
        password
      });

      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'An account with this email address already exists. Please sign in instead.';
      }
    }
  }
}
