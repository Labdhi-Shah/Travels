import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideIconComponent } from '../../shared/icon/lucide-icon.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideIconComponent],
  template: `
    <div class="pt-28 pb-24 bg-[#F8F7F3] min-h-screen">
      
      <!-- Hero Banner -->
      <section class="bg-[#071F22] text-white py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden mb-16 border-b border-[#D4A359]/20">
        <div class="absolute -top-32 -right-32 w-96 h-96 bg-[#D4A359]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="max-w-4xl mx-auto space-y-4 relative z-10">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#D4A359]/30 text-xs font-semibold text-[#D4A359] uppercase tracking-wider">
            <app-icon name="compass" [size]="13"></app-icon>
            Our Mission & Philosophy
          </div>
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight">
            Crafting Extraordinary <br class="hidden sm:inline" />
            <span class="italic font-normal text-[#D4A359]">Travel Stories</span>
          </h1>
          <p class="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            TripSphere was founded with a singular purpose: to bridge the gap between luxury travel inspiration and intelligent, stress-free trip planning.
          </p>
        </div>
      </section>

      <!-- Key Metrics Counter Section -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white p-7 rounded-3xl border border-[#EFEDE7] shadow-sm text-center">
            <p class="text-3xl sm:text-4xl font-serif font-bold text-[#071F22]">120+</p>
            <p class="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mt-2">Countries Covered</p>
          </div>
          <div class="bg-white p-7 rounded-3xl border border-[#EFEDE7] shadow-sm text-center">
            <p class="text-3xl sm:text-4xl font-serif font-bold text-[#071F22]">85,000+</p>
            <p class="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mt-2">Journeys Created</p>
          </div>
          <div class="bg-white p-7 rounded-3xl border border-[#EFEDE7] shadow-sm text-center">
            <p class="text-3xl sm:text-4xl font-serif font-bold text-[#071F22]">4.96★</p>
            <p class="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mt-2">Average Guest Rating</p>
          </div>
          <div class="bg-white p-7 rounded-3xl border border-[#EFEDE7] shadow-sm text-center">
            <p class="text-3xl sm:text-4xl font-serif font-bold text-[#071F22]">2,400+</p>
            <p class="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mt-2">Curated Luxury Stays</p>
          </div>
        </div>
      </section>

      <!-- Our Story -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="space-y-6">
          <span class="text-xs font-bold uppercase tracking-widest text-[#D4A359]">Our Vision</span>
          <h2 class="text-3xl sm:text-5xl font-serif font-bold text-[#071F22] leading-tight">
            Travel Should Be An Art, <br />Not An Endless Spreadsheets Chore
          </h2>
          <p class="text-base text-[#17202A] leading-relaxed font-light">
            Traditional travel platforms leave travelers juggling dozens of tabs: one for flights, one for boutique hotels, another for local tour guides, and complicated spreadsheets for calculating budgets and daily logistics.
          </p>
          <p class="text-sm text-[#6B7280] leading-relaxed font-light">
            TripSphere harmonizes discovery and execution. Whether you are mapping a scenic train route across the Swiss Alps or dining in hidden lantern alleys in Kyoto, our tools ensure you never miss a detail.
          </p>
          <div class="pt-2">
            <a
              routerLink="/destinations"
              class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#0A2D30] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
            >
              <span>Explore Our Destinations</span>
              <app-icon name="arrow-right" [size]="15"></app-icon>
            </a>
          </div>
        </div>

        <div class="relative">
          <div class="rounded-3xl overflow-hidden shadow-2xl border border-[#EFEDE7]">
            <img
              src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1000&q=80"
              alt="Travel Planning Inspiration"
              class="w-full h-[480px] object-cover"
            />
          </div>
          <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-[#EFEDE7] max-w-xs hidden sm:block">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-[#EFEDE7] text-[#071F22] flex items-center justify-center shrink-0">
                <app-icon name="award" [size]="20"></app-icon>
              </div>
              <div>
                <p class="text-xs font-bold text-[#071F22] uppercase tracking-wider">Certified Excellence</p>
                <p class="text-[11px] text-[#6B7280]">Global Luxury Travel Award 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Core Values -->
      <section class="bg-white py-20 border-t border-[#EFEDE7]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-14">
            <span class="text-xs font-bold uppercase tracking-widest text-[#D4A359]">Why TripSphere</span>
            <h2 class="text-3xl sm:text-4xl font-serif font-bold text-[#071F22] mt-2">Our Core Values</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="p-8 rounded-3xl bg-[#F8F7F3] border border-[#EFEDE7] space-y-4">
              <div class="w-12 h-12 rounded-2xl bg-[#0A2D30] text-[#D4A359] flex items-center justify-center">
                <app-icon name="sparkles" [size]="20"></app-icon>
              </div>
              <h3 class="text-xl font-serif font-bold text-[#071F22]">Uncompromised Quality</h3>
              <p class="text-sm text-[#6B7280] leading-relaxed font-light">
                Every hotel, itinerary activity, and private guide is vetted by travel curators with firsthand destination knowledge.
              </p>
            </div>

            <div class="p-8 rounded-3xl bg-[#F8F7F3] border border-[#EFEDE7] space-y-4">
              <div class="w-12 h-12 rounded-2xl bg-[#0B1320] text-white flex items-center justify-center">
                <app-icon name="dollar-sign" [size]="20"></app-icon>
              </div>
              <h3 class="text-xl font-serif font-bold text-[#0B1320]">Transparent Budgets</h3>
              <p class="text-sm text-[#6B7280] leading-relaxed font-light">
                No hidden resort fees or surprise booking markups. Dynamic budget tools let you balance splurges and savings.
              </p>
            </div>

            <div class="p-8 rounded-3xl bg-[#F8F7F3] border border-[#EFEDE7] space-y-4">
              <div class="w-12 h-12 rounded-2xl bg-[#0B1320] text-white flex items-center justify-center">
                <app-icon name="shield" [size]="20"></app-icon>
              </div>
              <h3 class="text-xl font-serif font-bold text-[#0B1320]">Effortless Peace of Mind</h3>
              <p class="text-sm text-[#6B7280] leading-relaxed font-light">
                Instant access to e-tickets, offline-ready timelines, and quick reservation vouchers directly from your personal dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  `
})
export class AboutComponent {}
