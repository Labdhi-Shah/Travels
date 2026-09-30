import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideIconComponent } from '../icon/lucide-icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LucideIconComponent],
  template: `
    <!-- Dark Teal-Black Footer matching Screenshot 5 (Color: #07191C) -->
    <footer class="bg-[#07191C] text-white pt-16 pb-10 border-t border-white/10 relative overflow-hidden select-none">
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Main Footer Columns Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          <!-- Column 1: Brand & Socials (lg:col-span-5) -->
          <div class="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
            <a routerLink="/" class="flex items-center gap-2.5 group cursor-pointer inline-flex">
              <div class="w-10 h-10 rounded-full bg-[#D4A359] text-[#07191C] flex items-center justify-center font-serif font-black text-xl shadow-md transition-transform duration-300 group-hover:scale-105">
                <span>T</span>
              </div>
              <span class="text-2xl font-bold tracking-tight font-display text-white">
                TripSphere
              </span>
            </a>
            
            <p class="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-sm">
              Discover breathtaking destinations, plan custom day-by-day itineraries, track your budget, and organize every detail of your travels in one place.
            </p>

            <!-- Social Media Buttons -->
            <div class="flex items-center gap-3 pt-2">
              <a
                href="#"
                (click)="$event.preventDefault()"
                class="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D4A359] hover:text-[#07191C] text-white/80 flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="X / Twitter"
              >
                <app-icon name="share-2" [size]="14"></app-icon>
              </a>
              <a
                href="#"
                (click)="$event.preventDefault()"
                class="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D4A359] hover:text-[#07191C] text-white/80 flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="Globe Travel"
              >
                <app-icon name="globe" [size]="14"></app-icon>
              </a>
              <a
                href="#"
                (click)="$event.preventDefault()"
                class="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D4A359] hover:text-[#07191C] text-white/80 flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="Instagram"
              >
                <app-icon name="camera" [size]="14"></app-icon>
              </a>
              <a
                href="#"
                (click)="$event.preventDefault()"
                class="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D4A359] hover:text-[#07191C] text-white/80 flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="Send"
              >
                <app-icon name="send" [size]="13"></app-icon>
              </a>
            </div>
          </div>

          <!-- Column 2: EXPLORE (lg:col-span-2) -->
          <div class="lg:col-span-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">EXPLORE</h4>
            <ul class="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <a routerLink="/destinations" class="hover:text-white transition-colors">Destinations</a>
              </li>
              <li>
                <a routerLink="/packages" class="hover:text-white transition-colors">Tour Packages</a>
              </li>
              <li>
                <a routerLink="/flights" class="hover:text-white transition-colors">Flights</a>
              </li>
              <li>
                <a routerLink="/hotels" class="hover:text-white transition-colors">Hotels</a>
              </li>
              <li>
                <a routerLink="/experiences" class="hover:text-white transition-colors">Experiences</a>
              </li>
            </ul>
          </div>

          <!-- Column 3: PLAN YOUR JOURNEY (lg:col-span-3) -->
          <div class="lg:col-span-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">PLAN YOUR JOURNEY</h4>
            <ul class="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <a routerLink="/plan-trip" class="hover:text-white transition-colors">Plan a Trip</a>
              </li>
              <li>
                <a routerLink="/my-trips" class="hover:text-white transition-colors">My Trips</a>
              </li>
              <li>
                <a routerLink="/bookings" class="hover:text-white transition-colors">My Bookings</a>
              </li>
              <li>
                <a routerLink="/budget" class="hover:text-white transition-colors">Budget Tracker</a>
              </li>
            </ul>
          </div>

          <!-- Column 4: COMPANY (lg:col-span-2) -->
          <div class="lg:col-span-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">COMPANY</h4>
            <ul class="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <a routerLink="/about" class="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a routerLink="/contact" class="hover:text-white transition-colors">Contact</a>
              </li>
              <li>
                <a routerLink="/about" class="hover:text-white transition-colors">Careers</a>
              </li>
              <li>
                <a routerLink="/about" class="hover:text-white transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

        </div>

        <!-- Bottom Copyright Row matching Screenshot 5 -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 TripSphere Inc. All rights reserved.</p>
          <div class="flex items-center gap-6">
            <a routerLink="/about" class="hover:text-white transition-colors">Terms of Service</a>
            <a routerLink="/about" class="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  email = '';
  isSubscribed = false;

  subscribe() {
    if (this.email.trim()) {
      this.isSubscribed = true;
      setTimeout(() => {
        this.email = '';
        this.isSubscribed = false;
      }, 4000);
    }
  }
}
