import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideIconComponent } from '../../../shared/icon/lucide-icon.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideIconComponent],
  template: `
    <div class="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white text-[#17202A]">
      
      <!-- Left: Large Travel Photography -->
      <div class="hidden lg:block lg:col-span-5 xl:col-span-6 relative bg-[#0B1320] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80"
          alt="Mountain Sanctuary"
          class="w-full h-full object-cover opacity-80"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/30 to-black/30"></div>

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

        <div class="absolute bottom-12 left-10 right-10 text-white space-y-3 z-10">
          <span class="text-xs font-bold uppercase tracking-widest text-[#D4A359]">
            ACCOUNT RECOVERY
          </span>
          <blockquote class="text-2xl font-serif italic text-white/95 leading-relaxed">
            “Your journeys, notes, and dream itineraries are safely archived and ready for your return.”
          </blockquote>
        </div>
      </div>

      <!-- Right: Reset Form -->
      <div class="lg:col-span-7 xl:col-span-6 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[#F8FAFC]">
        <div class="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-7 animate-fade-in">
          
          <div class="space-y-1.5 text-center sm:text-left">
            <h2 class="text-2xl sm:text-3xl font-bold font-display text-[#071F22]">
              Reset password
            </h2>
            <p class="text-xs sm:text-sm text-[#6B7280] font-light">
              Enter your account email to receive your password reset instructions.
            </p>
          </div>

          <form [formGroup]="forgotForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280]">Email Address</label>
              <div class="relative">
                <app-icon name="mail" [size]="16" extraClass="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]"></app-icon>
                <input
                  type="email"
                  formControlName="email"
                  placeholder="alex.mercer@tripsphere.travel"
                  class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#D4A359] focus:ring-1 focus:ring-[#D4A359]"
                />
              </div>
            </div>

            <button
              type="submit"
              [disabled]="forgotForm.invalid || sent"
              class="w-full py-3.5 rounded-xl bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#0A2D30] disabled:opacity-50 text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
            >
              {{ sent ? 'Recovery Link Sent!' : 'Send Reset Link' }}
            </button>

            @if (sent) {
              <div class="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-semibold text-center border border-emerald-200">
                A password reset email has been dispatched. Please check your inbox.
              </div>
            }
          </form>

          <div class="pt-4 border-t border-slate-200 text-center text-xs text-[#6B7280]">
            Remember your credentials?
            <a routerLink="/login" class="font-bold text-[#0A2D30] hover:text-[#D4A359] hover:underline ml-1">
              Back to Sign In
            </a>
          </div>

        </div>
      </div>

    </div>
  `
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  sent = false;

  forgotForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit(): void {
    if (this.forgotForm.valid) {
      this.sent = true;
    }
  }
}
