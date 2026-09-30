import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideIconComponent } from '../../shared/icon/lucide-icon.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideIconComponent],
  template: `
    <div class="min-h-screen bg-[#F8F7F3] flex flex-col items-center justify-center px-4 py-20 text-center relative overflow-hidden">
      <!-- Background decorative circle -->
      <div class="absolute w-96 h-96 rounded-full bg-[#D4A359]/5 filter blur-3xl -top-10 -left-10 pointer-events-none"></div>
      <div class="absolute w-96 h-96 rounded-full bg-[#0A2D30]/10 filter blur-3xl -bottom-10 -right-10 pointer-events-none"></div>

      <div class="relative z-10 max-w-lg mx-auto">
        <!-- Floating Compass Badge -->
        <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#071F22] text-[#D4A359] flex items-center justify-center mx-auto mb-6 shadow-2xl transform -rotate-6 hover:rotate-0 transition duration-300 border border-[#D4A359]/20">
          <app-icon name="compass" [size]="52"></app-icon>
        </div>

        <span class="text-xs font-bold uppercase tracking-widest text-[#D4A359] px-4 py-1.5 rounded-full bg-[#EFEDE7] inline-block mb-4">
          Error 404
        </span>

        <h1 class="text-4xl sm:text-5xl font-serif font-bold text-[#071F22] mb-3 leading-tight">
          Lost in Paradise?
        </h1>
        <p class="text-base text-[#6B7280] mb-8 leading-relaxed font-light">
          The destination or trail you're searching for cannot be mapped. It might have been moved or doesn't exist.
        </p>

        <!-- Action Links -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            routerLink="/"
            class="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#0A2D30] text-white font-semibold text-xs uppercase tracking-wider shadow-lg transition hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <app-icon name="home" [size]="15"></app-icon>
            <span>Back to Home</span>
          </a>
          <a
            routerLink="/destinations"
            class="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-[#EFEDE7] border border-[#EFEDE7] text-[#071F22] font-semibold text-xs uppercase tracking-wider transition hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <app-icon name="map-pin" [size]="15" class="text-[#D4A359]"></app-icon>
            <span>Explore Destinations</span>
          </a>
        </div>

        <!-- Quick Links -->
        <div class="mt-12 pt-8 border-t border-[#EFEDE7] flex items-center justify-center gap-6 text-xs text-[#6B7280]">
          <a routerLink="/packages" class="hover:text-[#0B1320] transition">Tour Packages</a>
          <span>•</span>
          <a routerLink="/hotels" class="hover:text-[#0B1320] transition">Luxury Hotels</a>
          <span>•</span>
          <a routerLink="/my-trips" class="hover:text-[#0B1320] transition">My Trips</a>
          <span>•</span>
          <a routerLink="/contact" class="hover:text-[#0B1320] transition">Support</a>
        </div>
      </div>
    </div>
  `
})
export class NotFoundComponent {}
