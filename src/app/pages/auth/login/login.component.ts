import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LucideIconComponent } from '../../../shared/icon/lucide-icon.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideIconComponent],
  template: `
    <!-- Split-Screen Design as required in Section 23 -->
    <div class="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white text-[#17202A]">
      
      <!-- LEFT: LARGE TRAVEL IMAGE (5 Cols on Desktop) -->
      <div class="hidden lg:block lg:col-span-5 xl:col-span-6 relative bg-[#0B1320] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80"
          alt="Coastal Odyssey"
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

        <!-- Editorial Quote on Image -->
        <div class="absolute bottom-12 left-10 right-10 text-white space-y-3 z-10">
          <span class="text-xs font-bold uppercase tracking-widest text-[#D4A359]">
            TRAVEL BEYOND ORDINARY
          </span>
          <blockquote class="text-2xl font-display font-medium text-white/95 leading-relaxed">
            “The world is too vast to stay in one story. Discover places that awaken your spirit.”
          </blockquote>
          <p class="text-xs text-white/70">
            TripSphere Curated Editions • 2026
          </p>
        </div>
      </div>

      <!-- RIGHT: AUTHENTICATION FORM (7 Cols on Desktop) -->
      <div class="lg:col-span-7 xl:col-span-6 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[#F8F7F3]">
        <div class="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#EFEDE7] shadow-xl space-y-8 animate-fade-in">
          
          <!-- Mobile Brand Logo -->
          <div class="lg:hidden flex justify-center pb-2">
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
          <div class="space-y-1.5 text-center sm:text-left">
            <h2 class="text-2xl sm:text-3xl font-bold font-display text-[#071F22]">
              Welcome back
            </h2>
            <p class="text-xs sm:text-sm text-[#6B7280] font-light">
              Enter your credentials to access your trips, itineraries, and collections.
            </p>
          </div>

          <!-- Quick 1-Click Demo Login Banner -->
          <div class="p-3.5 bg-[#EFEDE7]/70 rounded-2xl border border-[#EFEDE7] flex items-center justify-between gap-3">
            <span class="text-xs text-[#17202A] font-medium">Quick preview?</span>
            <button
              type="button"
              (click)="onDemoLogin()"
              class="px-3.5 py-1.5 rounded-xl bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#0A2D30] text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              1-Click Demo Login
            </button>
          </div>

          <!-- Error Alert -->
          @if (errorMessage) {
            <div class="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold">
              {{ errorMessage }}
            </div>
          }

          <!-- Form -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-5">
            <!-- Email -->
            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280]">Email Address</label>
              <div class="relative">
                <app-icon name="mail" [size]="16" extraClass="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]"></app-icon>
                <input
                  type="email"
                  formControlName="email"
                  placeholder="alex.mercer@tripsphere.travel"
                  class="w-full pl-10 pr-4 py-3 rounded-xl bg-[#EFEDE7]/40 border border-[#0B1320]/10 text-sm focus:outline-none focus:border-[#D4A359]"
                />
              </div>
              @if (loginForm.get('email')?.touched && loginForm.get('email')?.invalid) {
                <p class="text-xs text-rose-500 mt-1">Please enter a valid email address.</p>
              }
            </div>

            <!-- Password -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280]">Password</label>
                <a routerLink="/forgot-password" class="text-xs font-bold text-[#D4A359] hover:underline">
                  Forgot password?
                </a>
              </div>
              <div class="relative">
                <app-icon name="shield" [size]="16" extraClass="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]"></app-icon>
                <input
                  type="password"
                  formControlName="password"
                  placeholder="••••••••"
                  class="w-full pl-10 pr-4 py-3 rounded-xl bg-[#EFEDE7]/40 border border-[#0B1320]/10 text-sm focus:outline-none focus:border-[#D4A359]"
                />
              </div>
              @if (loginForm.get('password')?.touched && loginForm.get('password')?.invalid) {
                <p class="text-xs text-rose-500 mt-1">Password must be at least 6 characters.</p>
              }
            </div>

            <!-- Remember me -->
            <div class="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                formControlName="rememberMe"
                id="rememberMe"
                class="rounded text-[#0A2D30] focus:ring-[#D4A359] accent-[#0A2D30] w-4 h-4 cursor-pointer"
              />
              <label for="rememberMe" class="text-xs font-medium text-slate-600 cursor-pointer">
                Remember me
              </label>
            </div>

            <!-- Submit Button: "Login" -->
            <button
              type="submit"
              [disabled]="loginForm.invalid"
              class="w-full py-3.5 rounded-xl bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#0A2D30] disabled:opacity-50 text-white font-semibold text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Login
            </button>
          </form>

          <!-- Register Link -->
          <div class="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Don't have an account yet?
            <a routerLink="/register" class="font-bold text-[#0A2D30] hover:text-[#D4A359] hover:underline ml-1">
              Create your account
            </a>
          </div>

        </div>
      </div>

    </div>
  `
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loginForm: FormGroup = this.fb.group({
    email: ['alex.mercer@tripsphere.travel', [Validators.required, Validators.email]],
    password: ['password123', [Validators.required, Validators.minLength(6)]],
    rememberMe: [true]
  });

  returnUrl = '/dashboard';
  errorMessage = '';

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const success = this.authService.login(email, password);
      if (success) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.errorMessage = 'Invalid email or password. Please try again or use 1-Click Demo Login.';
      }
    }
  }

  onDemoLogin() {
    this.errorMessage = '';
    this.authService.login('alex.mercer@tripsphere.travel', 'password123');
    this.router.navigateByUrl(this.returnUrl);
  }
}
