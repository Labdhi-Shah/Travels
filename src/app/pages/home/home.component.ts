import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideIconComponent } from '../../shared/icon/lucide-icon.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { DestinationService } from '../../core/services/destination.service';
import { PackageService } from '../../core/services/package.service';
import { HotelService } from '../../core/services/hotel.service';
import { FavoriteService } from '../../core/services/favorite.service';
import { TestimonialService } from '../../core/services/testimonial.service';
import { StoryService } from '../../core/services/story.service';
import { ToastService } from '../../core/services/toast.service';
import { Destination } from '../../models/destination.model';
import { TourPackage } from '../../models/package.model';
import { Hotel } from '../../models/hotel.model';

interface ExperienceNiche {
  title: string;
  count: string;
  image: string;
  category: string;
}

interface TravelStory {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    LucideIconComponent,
    SearchBarComponent
  ],
  template: `
    <div class="min-h-screen bg-[#F8FAFC] text-[#0F1E26] overflow-x-hidden selection:bg-[#D4A359] selection:text-[#071F22]">
      
      <!-- ============================================================== -->
      <!-- 1. HERO SECTION — FULL-SCREEN VIDEO (100vh × 100% width)       -->
      <!-- Exactly matching Screenshot 1                                 -->
      <!-- ============================================================== -->
      <section class="relative w-full h-screen min-h-[750px] flex flex-col justify-between overflow-hidden">
        
        <!-- REAL TRAVEL VIDEO BACKGROUND (Full 100% w/h, autoplay, muted, loop, playsinline) -->
        <div class="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video
            #heroVideo
            autoplay
            [muted]="isVideoMuted()"
            loop
            playsinline
            preload="auto"
            class="w-full h-full object-cover scale-100 transition-transform duration-1000 ease-out"
          >
            <source src="/videos/hero-travel.mp4" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-waves-crashing-on-a-rocky-beach-42998-large.mp4" type="video/mp4" />
          </video>

          <!-- Sophisticated dark/transparent gradient overlay for pristine text readability -->
          <div class="absolute inset-0 bg-gradient-to-b from-[#071F22]/70 via-[#071F22]/40 to-[#071F22]/85 z-10 pointer-events-none"></div>
          <div class="absolute inset-0 bg-radial-gradient from-transparent via-[#071F22]/30 to-[#071F22]/70 z-10 pointer-events-none"></div>
        </div>

        <!-- Center Content matching Screenshot 1 -->
        <div class="relative z-20 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 flex-1 flex flex-col justify-center items-center text-center space-y-5">
          
          <!-- Eyebrow Badge matching Screenshot 1: ✈ ---- [DISCOVER YOUR NEXT HORIZON] -->
          <div class="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-[#D4A359]/40 text-[#D4A359] text-xs sm:text-sm font-bold tracking-widest uppercase animate-fade-in shadow-lg">
            <span class="text-white text-base">✈</span>
            <span class="text-white/40 tracking-normal font-mono">----</span>
            <span>DISCOVER YOUR NEXT HORIZON</span>
          </div>

          <!-- Main Hero Title matching Screenshot 1 -->
          <!-- "Explore the World," in white bold, "Your Own Way" in warm gold with loop plane -->
          <div class="space-y-1 sm:space-y-2 animate-text-reveal">
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display text-white tracking-tight leading-[1.08] drop-shadow-md">
              Explore the World,
            </h1>
            <div class="relative inline-block">
              <span class="font-script text-5xl sm:text-7xl lg:text-8xl font-bold text-[#E5A93C] tracking-wide block drop-shadow-lg -rotate-1">
                Your Own Way
              </span>
              <!-- White Paper Plane looping underneath -->
              <div class="absolute -bottom-3 sm:-bottom-4 left-1/4 sm:left-1/3 transform -translate-x-1/2 flex items-center">
                <span class="text-white text-lg sm:text-xl drop-shadow -rotate-45">✈</span>
              </div>
            </div>
          </div>

          <!-- Subtitle matching Screenshot 1 -->
          <p class="text-sm sm:text-base text-slate-200/90 max-w-2xl font-light leading-relaxed drop-shadow-sm pt-2">
            Discover breathtaking destinations, plan custom day-by-day itineraries, and organize every part of your trip in one premium dashboard.
          </p>

          <!-- Hero Action CTAs (Explore & Plan My Trip) -->
          <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              routerLink="/destinations"
              class="px-6 py-3 rounded-full bg-[#D4A359] hover:bg-[#E5A93C] text-[#071F22] font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2 shadow-lg shadow-[#D4A359]/25 hover:shadow-xl transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <app-icon name="compass" [size]="16"></app-icon>
              <span>Explore Destinations</span>
            </a>

            <a
              routerLink="/plan-trip"
              class="px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/25 font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <app-icon name="plus" [size]="16"></app-icon>
              <span>Plan My Trip</span>
            </a>

            <button
              type="button"
              (click)="toggleMute()"
              class="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium transition-all duration-200 cursor-pointer"
              title="Toggle Audio"
            >
              <app-icon [name]="isVideoMuted() ? 'volume-x' : 'volume-2'" [size]="14"></app-icon>
              <span class="hidden sm:inline">{{ isVideoMuted() ? 'Unmute Sound' : 'Mute Sound' }}</span>
            </button>
          </div>

        </div>

        <!-- Bottom Portion of Hero: Search Bar matching Screenshot 1 -->
        <div class="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12">
          <app-search-bar></app-search-bar>
        </div>

      </section>

      <!-- ============================================================== -->
      <!-- 2. POPULAR DESTINATIONS (8 Cards in 3 Columns)                  -->
      <!-- Exactly matching Screenshot 2                                  -->
      <!-- ============================================================== -->
      <section class="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- Header: Centered Title & Subtitle -->
        <div class="text-center space-y-2 max-w-2xl mx-auto">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#0F1E26] tracking-tight">
            Popular Destinations
          </h2>
          <p class="text-xs sm:text-sm text-slate-500 font-normal">
            Explore the most breathtaking places around the globe curated by travel experts.
          </p>
        </div>

        <!-- 8 Destination Cards Grid (3 Columns) matching Screenshot 2 -->
        <!-- Bali, Dubai, Paris, Switzerland, Maldives, London, Kyoto, Goa -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          @for (dest of eightPopularDestinations(); track dest.id) {
            <div class="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden">
              
              <!-- Card Image with Category Badge & Wishlist Button -->
              <div class="relative p-3 pb-0">
                <div class="relative h-56 rounded-2xl overflow-hidden bg-slate-100">
                  <a [routerLink]="['/destinations', dest.id]" class="block w-full h-full cursor-pointer">
                    <img
                      [src]="dest.image"
                      [alt]="dest.name"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </a>
                  <!-- Category Badge (Amber Pill on bottom-left) -->
                  <span class="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#E5A93C] text-[#071F22] text-[11px] font-bold shadow-md tracking-wider pointer-events-none">
                    {{ dest.badge }}
                  </span>
                  <!-- Wishlist Button (Top-Right) -->
                  <button
                    type="button"
                    (click)="toggleFavorite(dest.id, $event)"
                    class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-red-500 backdrop-blur-md flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer z-10"
                    [attr.aria-label]="isFavorite(dest.id) ? 'Remove from favorites' : 'Add to favorites'"
                  >
                    <app-icon
                      name="heart"
                      [size]="14"
                      [isFilled]="isFavorite(dest.id)"
                      [extraClass]="isFavorite(dest.id) ? 'text-red-500' : 'text-slate-600'"
                    ></app-icon>
                  </button>
                </div>
              </div>

              <!-- Card Content Body -->
              <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div class="space-y-2">
                  <!-- Country Tag & Rating -->
                  <div class="flex items-center justify-between text-xs">
                    <div class="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider">
                      <app-icon name="map-pin" [size]="13" extraClass="text-slate-400"></app-icon>
                      <span>{{ dest.country }}</span>
                    </div>
                    <div class="flex items-center gap-1 text-xs font-bold text-[#E5A93C]">
                      <app-icon name="star" [size]="13" [isFilled]="true"></app-icon>
                      <span>{{ dest.rating }}</span>
                    </div>
                  </div>

                  <!-- Destination Name -->
                  <a [routerLink]="['/destinations', dest.id]" class="block group-hover:text-[#0C3B3E] transition-colors cursor-pointer">
                    <h3 class="text-xl font-bold font-display text-[#0F1E26] leading-tight">
                      {{ dest.name }}
                    </h3>
                  </a>

                  <!-- Description -->
                  <p class="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed line-clamp-2">
                    {{ dest.description }}
                  </p>
                </div>

                <!-- Bottom Row: Price & Explore Link -->
                <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">STARTS FROM</span>
                    <span class="text-base sm:text-lg font-bold text-[#0F1E26]">
                      \${{ dest.price }} <span class="text-xs font-normal text-slate-400">/ person</span>
                    </span>
                  </div>

                  <a
                    [routerLink]="['/destinations', dest.id]"
                    class="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0C3B3E] group-hover:translate-x-1 transition-all cursor-pointer"
                  >
                    <span>Explore Details</span>
                    <span>&rarr;</span>
                  </a>
                </div>

              </div>

            </div>
          }
        </div>

        <!-- Centered View All Destinations Button -->
        <div class="text-center pt-2">
          <a
            routerLink="/destinations"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200 transition-all cursor-pointer"
          >
            <span>View All Destinations</span>
            <span>&rarr;</span>
          </a>
        </div>

      </section>

      <!-- ============================================================== -->
      <!-- 3. FEATURED TOUR PACKAGES (8 Cards in 3 Columns)                -->
      <!-- Exactly matching Screenshot 3                                  -->
      <!-- ============================================================== -->
      <section class="py-20 sm:py-24 bg-white border-y border-slate-200/80">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <!-- Header with Pill Badge -->
          <div class="text-center space-y-2 max-w-2xl mx-auto">
            <span class="inline-block px-3 py-1 rounded-full bg-slate-100 text-[#D4A359] text-[11px] font-bold tracking-widest uppercase border border-slate-200">
              CURATED ITINERARIES
            </span>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#0F1E26] tracking-tight">
              Featured Tour Packages
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 font-normal">
              All-inclusive premium vacation packages featuring guided activities and luxury hotels.
            </p>
          </div>

          <!-- 8 Package Cards Grid (3 Columns) matching Screenshot 3 -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            @for (pkg of eightFeaturedPackages(); track pkg.id) {
              <div class="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden">
                
                <!-- Package Image with Duration, Travelers & Wishlist Badges -->
                <div class="relative p-3 pb-0">
                  <div class="relative h-56 rounded-2xl overflow-hidden bg-slate-100">
                    <a [routerLink]="['/packages', pkg.id]" class="block w-full h-full cursor-pointer">
                      <img
                        [src]="pkg.image"
                        [alt]="pkg.name"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </a>
                    <!-- Duration Badge (Top Left) -->
                    <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold pointer-events-none">
                      {{ pkg.durationDays }} Days
                    </span>
                    <!-- Travelers Badge (Top Right) -->
                    <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1 pointer-events-none">
                      <app-icon name="users" [size]="12"></app-icon>
                      <span>{{ pkg.maxTravelers }} Travelers</span>
                    </span>
                    <!-- Wishlist Button (Bottom Right) -->
                    <button
                      type="button"
                      (click)="toggleFavorite(pkg.id, $event)"
                      class="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-red-500 backdrop-blur-md flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer z-10"
                      [attr.aria-label]="isFavorite(pkg.id) ? 'Remove from favorites' : 'Add to favorites'"
                    >
                      <app-icon
                        name="heart"
                        [size]="14"
                        [isFilled]="isFavorite(pkg.id)"
                        [extraClass]="isFavorite(pkg.id) ? 'text-red-500' : 'text-slate-600'"
                      ></app-icon>
                    </button>
                  </div>
                </div>

                <!-- Package Details Body -->
                <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div class="space-y-2.5">
                    <!-- Rating -->
                    <div class="flex items-center gap-1 text-xs font-bold text-[#E5A93C]">
                      <app-icon name="star" [size]="13" [isFilled]="true"></app-icon>
                      <span>{{ pkg.rating }} Rating</span>
                    </div>

                    <!-- Title -->
                    <a [routerLink]="['/packages', pkg.id]" class="block group-hover:text-[#0C3B3E] transition-colors cursor-pointer">
                      <h3 class="text-lg font-bold font-display text-[#0F1E26] leading-tight line-clamp-1">
                        {{ pkg.name }}
                      </h3>
                    </a>

                    <!-- Description -->
                    <p class="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2">
                      {{ pkg.overview }}
                    </p>

                    <!-- Highlight Tags (Horizontal chips) -->
                    <div class="flex flex-wrap gap-1.5 pt-1">
                      @for (tag of pkg.activitiesIncluded.slice(0, 4); track tag) {
                        <span class="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-medium border border-slate-200">
                          {{ tag }}
                        </span>
                      }
                    </div>
                  </div>

                  <!-- Price & View Package Button Row -->
                  <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">STARTS AT</span>
                      <span class="text-base sm:text-lg font-bold text-[#0F1E26]">
                        \${{ pkg.price }} <span class="text-xs font-normal text-slate-400">/ person</span>
                      </span>
                    </div>

                    <a
                      [routerLink]="['/packages', pkg.id]"
                      class="px-4 py-2 rounded-xl bg-[#0C3B3E] hover:bg-[#072527] text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm cursor-pointer"
                    >
                      View Package
                    </a>
                  </div>

                </div>

              </div>
            }
          </div>

        </div>
      </section>

      <!-- ============================================================== -->
      <!-- 4. FEATURED HOTELS (3 Cards in 3 Columns)                       -->
      <!-- Exactly matching Screenshot 4                                  -->
      <!-- ============================================================== -->
      <section class="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- Header with Pill Badge -->
        <div class="text-center space-y-2 max-w-2xl mx-auto">
          <span class="inline-block px-3 py-1 rounded-full bg-slate-100 text-[#D4A359] text-[11px] font-bold tracking-widest uppercase border border-slate-200">
            LUXURY STAYS
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#0F1E26] tracking-tight">
            Featured Hotels
          </h2>
          <p class="text-xs sm:text-sm text-slate-500 font-normal">
            Handpicked 5-star resorts and boutique stays featuring premium wellness amenities.
          </p>
        </div>

        <!-- 3 Hotel Cards Grid matching Screenshot 4 -->
        <!-- Maya Ubud Resort & Spa, Hotel Regina Louvre, Canaves Oia Suites -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-7">
          @for (hotel of threeFeaturedHotels(); track hotel.id) {
            <div class="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden">
              
              <!-- Hotel Image & Wishlist Button -->
              <div class="relative p-3 pb-0">
                <div class="relative h-56 rounded-2xl overflow-hidden bg-slate-100">
                  <a [routerLink]="['/hotels', hotel.id]" class="block w-full h-full cursor-pointer">
                    <img
                      [src]="hotel.image"
                      [alt]="hotel.name"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </a>
                  <!-- Rating Badge (Top Right) -->
                  <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#E5A93C] text-xs font-bold flex items-center gap-1 pointer-events-none">
                    <app-icon name="star" [size]="12" [isFilled]="true"></app-icon>
                    <span>{{ hotel.rating }}</span>
                  </span>
                  <!-- Wishlist Button (Top Left) -->
                  <button
                    type="button"
                    (click)="toggleFavorite(hotel.id, $event)"
                    class="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-red-500 backdrop-blur-md flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer z-10"
                    [attr.aria-label]="isFavorite(hotel.id) ? 'Remove from favorites' : 'Add to favorites'"
                  >
                    <app-icon
                      name="heart"
                      [size]="14"
                      [isFilled]="isFavorite(hotel.id)"
                      [extraClass]="isFavorite(hotel.id) ? 'text-red-500' : 'text-slate-600'"
                    ></app-icon>
                  </button>
                </div>
              </div>

              <!-- Hotel Details Body -->
              <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div class="space-y-2">
                  <a [routerLink]="['/hotels', hotel.id]" class="block group-hover:text-[#0C3B3E] transition-colors cursor-pointer">
                    <h3 class="text-lg font-bold font-display text-[#0F1E26] leading-tight">
                      {{ hotel.name }}
                    </h3>
                  </a>

                  <!-- Location -->
                  <div class="flex items-center gap-1.5 text-xs text-slate-400">
                    <app-icon name="map-pin" [size]="13" extraClass="text-slate-400"></app-icon>
                    <span>{{ hotel.location }}</span>
                  </div>

                  <!-- Description -->
                  <p class="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2">
                    {{ hotel.description }}
                  </p>

                  <!-- Amenities Chips -->
                  <div class="flex flex-wrap gap-1.5 pt-2">
                    @for (amenity of hotel.amenities.slice(0, 5); track amenity) {
                      <span class="px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 text-[10px] font-medium border border-slate-200">
                        {{ amenity }}
                      </span>
                    }
                  </div>
                </div>

                <!-- Price & View Details Button -->
                <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">PRICE FROM</span>
                    <span class="text-base sm:text-lg font-bold text-[#0F1E26]">
                      \${{ hotel.pricePerNight }} <span class="text-xs font-normal text-slate-400">/ night</span>
                    </span>
                  </div>

                  <a
                    [routerLink]="['/hotels', hotel.id]"
                    class="px-4 py-2 rounded-xl border border-slate-300 hover:border-[#0C3B3E] text-slate-700 hover:text-[#0C3B3E] font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
                  >
                    View Details
                  </a>
                </div>

              </div>

            </div>
          }
        </div>

      </section>

      <!-- ============================================================== -->
      <!-- 5. TRAVEL EXPERIENCES (Dark Teal Full-Width Section)            -->
      <!-- Exactly matching Screenshot 4                                  -->
      <!-- ============================================================== -->
      <section class="py-20 sm:py-24 bg-[#0A2D30] text-white relative overflow-hidden">
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          <!-- Header with Gold Badge -->
          <div class="text-center space-y-2 max-w-2xl mx-auto">
            <span class="inline-block px-3 py-1 rounded-full bg-white/10 text-[#D4A359] text-[11px] font-bold tracking-widest uppercase border border-white/15">
              CURATED NICHES
            </span>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
              Travel Experiences
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 font-light">
              Find vacation packages that match your lifestyle, from mountain hikes to private beaches.
            </p>
          </div>

          <!-- 8 Experience Cards (2 Rows of 4 Columns) matching Screenshot 4 -->
          <!-- Adventure, Beaches, Mountains, Cultural, Food & Dining, Luxury, Wildlife, Photography -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            @for (exp of experiencesList; track exp.title) {
              <a
                routerLink="/destinations"
                [queryParams]="{ type: exp.category }"
                class="group relative h-44 sm:h-52 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-lg flex flex-col justify-end p-4 sm:p-5 border border-white/10"
              >
                <!-- Background Image with Zoom -->
                <img
                  [src]="exp.image"
                  [alt]="exp.title"
                  class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                <!-- Dark Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>

                <!-- Text Overlay -->
                <div class="relative z-10 space-y-0.5">
                  <h3 class="text-base sm:text-lg font-bold font-display text-white group-hover:text-[#D4A359] transition-colors leading-tight">
                    {{ exp.title }}
                  </h3>
                  <span class="text-[11px] text-[#D4A359] font-medium block">
                    {{ exp.count }}
                  </span>
                </div>
              </a>
            }
          </div>

        </div>

      </section>

      <!-- ============================================================== -->
      <!-- 6. THREE TRUST PILLARS (Clean White Background)                 -->
      <!-- Exactly matching Screenshot 4 bottom                           -->
      <!-- ============================================================== -->
      <section class="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center">
            
            <!-- Pillar 1: Secure Premium Travel -->
            <div class="space-y-3 px-4">
              <div class="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto text-[#0C3B3E] shadow-sm">
                <app-icon name="shield" [size]="24"></app-icon>
              </div>
              <h3 class="text-base sm:text-lg font-bold font-display text-[#0F1E26]">
                Secure Premium Travel
              </h3>
              <p class="text-xs text-slate-500 font-normal leading-relaxed max-w-xs mx-auto">
                All packages and hotel reservations are fully backed by trip protection and flexible refunds.
              </p>
            </div>

            <!-- Pillar 2: Infinite Destinations -->
            <div class="space-y-3 px-4">
              <div class="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto text-[#0C3B3E] shadow-sm">
                <app-icon name="globe" [size]="24"></app-icon>
              </div>
              <h3 class="text-base sm:text-lg font-bold font-display text-[#0F1E26]">
                Infinite Destinations
              </h3>
              <p class="text-xs text-slate-500 font-normal leading-relaxed max-w-xs mx-auto">
                Access pre-planned routes and customized timelines for hundreds of exotic locations worldwide.
              </p>
            </div>

            <!-- Pillar 3: Expert Concierge Support -->
            <div class="space-y-3 px-4">
              <div class="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto text-[#0C3B3E] shadow-sm">
                <app-icon name="bell" [size]="24"></app-icon>
              </div>
              <h3 class="text-base sm:text-lg font-bold font-display text-[#0F1E26]">
                Expert Concierge Support
              </h3>
              <p class="text-xs text-slate-500 font-normal leading-relaxed max-w-xs mx-auto">
                Enjoy premium assistance during holidays and budget moment optimization by our professional agents.
              </p>
            </div>

          </div>

        </div>
      </section>

      <!-- ============================================================== -->
      <!-- 7. WHAT OUR TRAVELERS SAY (Carousel Card)                      -->
      <!-- Exactly matching Screenshot 5                                  -->
      <!-- ============================================================== -->
      <section class="py-20 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
        
        <!-- Header with Pill Badge -->
        <div class="space-y-2">
          <span class="inline-block px-3 py-1 rounded-full bg-slate-100 text-[#D4A359] text-[11px] font-bold tracking-widest uppercase border border-slate-200">
            REVIEWS
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#0F1E26] tracking-tight">
            What Our Travelers Say
          </h2>
        </div>

        <!-- Featured Review Card matching Screenshot 5 -->
        <div class="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 relative overflow-hidden">
          
          <!-- Avatar with Border -->
          <div class="flex justify-center">
            <img
              [src]="currentTestimonial().avatar"
              [alt]="currentTestimonial().name"
              class="w-16 h-16 rounded-full object-cover border-2 border-[#D4A359] shadow-md"
            />
          </div>

          <!-- 5 Golden Stars -->
          <div class="flex items-center justify-center gap-1 text-[#E5A93C]">
            @for (star of [1,2,3,4,5]; track star) {
              <app-icon name="star" [size]="16" [isFilled]="true"></app-icon>
            }
          </div>

          <!-- Quote Text -->
          <p class="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto italic">
            "{{ currentTestimonial().review }}"
          </p>

          <!-- Traveler Name & Details -->
          <div class="space-y-0.5">
            <h4 class="text-base font-bold font-display text-[#0F1E26]">
              {{ currentTestimonial().name }}
            </h4>
            <span class="text-xs text-slate-400 font-medium">
              {{ currentTestimonial().travelCount }}
            </span>
          </div>

          <!-- Pagination Carousel Navigation: < 1/3 > -->
          <div class="flex items-center justify-center gap-4 pt-2">
            <button
              type="button"
              (click)="prevTestimonial()"
              class="w-8 h-8 rounded-full border border-slate-200 hover:border-[#0C3B3E] hover:bg-[#0C3B3E] hover:text-white flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              aria-label="Previous Review"
            >
              &larr;
            </button>
            <span class="text-xs font-bold text-slate-400">
              {{ activeReviewIndex + 1 }} / {{ testimonialsList.length }}
            </span>
            <button
              type="button"
              (click)="nextTestimonial()"
              class="w-8 h-8 rounded-full border border-slate-200 hover:border-[#0C3B3E] hover:bg-[#0C3B3E] hover:text-white flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              aria-label="Next Review"
            >
              &rarr;
            </button>
          </div>

        </div>

      </section>

      <!-- ============================================================== -->
      <!-- 8. GET TRAVEL INSPIRATION (Newsletter Banner)                  -->
      <!-- Exactly matching Screenshot 5                                  -->
      <!-- ============================================================== -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
        
        <div class="relative bg-gradient-to-r from-[#071F22] via-[#0A2D30] to-[#071F22] rounded-3xl sm:rounded-[36px] p-8 sm:p-16 text-center text-white space-y-6 shadow-2xl overflow-hidden border border-white/10">
          
          <!-- Subtle background glow -->
          <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4A359]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 space-y-2 max-w-xl mx-auto">
            <!-- Pill Badge -->
            <span class="inline-block px-3 py-1 rounded-full bg-white/10 text-[#D4A359] text-[10px] sm:text-[11px] font-bold tracking-widest uppercase border border-white/15">
              NEWSLETTER
            </span>

            <h2 class="text-2xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
              Get Travel Inspiration
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Discover new destinations, exclusive itineraries, and early-booking inspiration delivered weekly.
            </p>
          </div>

          <!-- Subscription Pill Form matching Screenshot 5 -->
          <form (ngSubmit)="subscribeNewsletter()" class="relative z-10 max-w-md mx-auto flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1.5 focus-within:border-[#D4A359] transition-colors">
            <input
              type="email"
              [(ngModel)]="newsletterEmail"
              name="newsletterEmail"
              placeholder="Enter your email address"
              required
              class="w-full px-5 py-2.5 text-xs sm:text-sm bg-transparent text-white placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              class="px-6 py-2.5 rounded-full bg-[#D4A359] hover:bg-[#E5A93C] text-[#071F22] font-bold text-xs sm:text-sm shrink-0 shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>Subscribe</span>
              <span>&rarr;</span>
            </button>
          </form>

        </div>

      </section>

    </div>
  `
})
export class HomeComponent implements OnInit {
  private destService = inject(DestinationService);
  private pkgService = inject(PackageService);
  private hotelService = inject(HotelService);
  private favoriteService = inject(FavoriteService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  isFavorite(id: string): boolean {
    return this.favoriteService.isFavorite(id);
  }

  toggleFavorite(id: string, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.favoriteService.toggleFavorite(id);
  }

  @ViewChild('heroVideo') heroVideoRef?: ElementRef<HTMLVideoElement>;

  isVideoMuted = signal(true);
  newsletterEmail = '';

  // 1. Eight Popular Destinations matching Screenshot 2:
  // Bali, Dubai, Paris, Switzerland, Maldives, London, Kyoto, Goa
  eightPopularDestinations = computed(() => {
    return [
      {
        id: 'bali-indonesia',
        name: 'Bali',
        country: 'INDONESIA',
        badge: 'Beach',
        rating: 4.9,
        price: 850,
        description: 'Tropical paradise known for iconic rice terraces, cliffside temples, pristine beaches, and vibrant culture.',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'dubai-uae',
        name: 'Dubai',
        country: 'UAE',
        badge: 'City',
        rating: 4.8,
        price: 950,
        description: 'Futuristic metropolis boasting towering skyscrapers, world-class luxury shopping, desert dunes, and resort resorts.',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'paris-france',
        name: 'Paris',
        country: 'FRANCE',
        badge: 'City',
        rating: 4.9,
        price: 1200,
        description: 'The city of light famous for haute cuisine, high fashion, legendary art museums, and timeless romantic architecture.',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'swiss-alps',
        name: 'Switzerland',
        country: 'SWITZERLAND',
        badge: 'Mountain',
        rating: 4.9,
        price: 1400,
        description: 'Breathtaking Alpine peaks, serene turquoise lakes, alpine ski resort towns, and historic swiss chalets.',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'maldives',
        name: 'Maldives',
        country: 'MALDIVES',
        badge: 'Beach',
        rating: 4.9,
        price: 1600,
        description: 'Pristine white sand atolls, stunning overwater villas, vibrant coral reefs, and exclusive tropical tranquility.',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'london-uk',
        name: 'London',
        country: 'UK',
        badge: 'City',
        rating: 4.8,
        price: 1100,
        description: 'Historic royal landmarks, legendary museums, world-class theatre, bustling street markets, and vibrant modern culture.',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'kyoto-japan',
        name: 'Kyoto',
        country: 'JAPAN',
        badge: 'Culture',
        rating: 4.9,
        price: 1050,
        description: 'Heartbeat of traditional Japanese culture, serene bamboo groves, traditional wooden machiya houses, and geisha traditions.',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'goa-india',
        name: 'Goa',
        country: 'INDIA',
        badge: 'Beach',
        rating: 4.7,
        price: 450,
        description: 'Sun-drenched golden beaches, Portuguese heritage architecture, vibrant beach shacks, seafood delicacies, and water sports.',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
      }
    ];
  });

  // 2. Eight Featured Tour Packages matching Screenshot 3:
  allPackages = this.pkgService.packages;
  eightFeaturedPackages = computed(() => {
    const list = this.allPackages();
    const targetIds = [
      'bali-escape-wellness',
      'dubai-premium-desert',
      'paris-highlights-cultural',
      'switzerland-alps-adventure',
      'maldives-overwater-retreat',
      'london-royal-heritage',
      'kyoto-cultural-journey',
      'goa-tropical-beach'
    ];
    const ordered = targetIds
      .map(id => list.find(p => p.id === id))
      .filter((p): p is TourPackage => !!p);
    return ordered.length >= 8 ? ordered : list.slice(0, 8);
  });

  // 3. Three Featured Hotels matching Screenshot 4:
  allHotels = this.hotelService.hotels;
  threeFeaturedHotels = computed(() => {
    const list = this.allHotels();
    const targetIds = ['maya-ubud', 'hotel-regina-louvre', 'canaves-oia-suites'];
    const ordered = targetIds
      .map(id => list.find(h => h.id === id))
      .filter((h): h is Hotel => !!h);
    return ordered.length >= 3 ? ordered : list.slice(0, 3);
  });

  // 4. Eight Travel Experiences matching Screenshot 4:
  readonly experiencesList: ExperienceNiche[] = [
    {
      title: 'Adventure',
      count: '14 Destinations',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
      category: 'Adventure'
    },
    {
      title: 'Beaches',
      count: '22 Destinations',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      category: 'Beach'
    },
    {
      title: 'Mountains',
      count: '18 Destinations',
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
      category: 'Mountain'
    },
    {
      title: 'Cultural',
      count: '20 Destinations',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
      category: 'Culture'
    },
    {
      title: 'Food & Dining',
      count: '15 Destinations',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      category: 'Food'
    },
    {
      title: 'Luxury',
      count: '12 Destinations',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
      category: 'Luxury'
    },
    {
      title: 'Wildlife',
      count: '10 Destinations',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80',
      category: 'Adventure'
    },
    {
      title: 'Photography',
      count: '16 Destinations',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
      category: 'City'
    }
  ];

  // 5. Testimonials List matching Screenshot 5:
  activeReviewIndex = 0;
  readonly testimonialsList = [
    {
      name: 'Alex Johnson',
      travelCount: 'Traveled 3x',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      review: 'TripSphere completely changed how I plan my holidays. The itinerary builder was so simple to use, and having my budget and hotel bookings in one clean dashboard made my trip to Japan completely stress-free!'
    },
    {
      name: 'Sarah Jenkins',
      travelCount: 'Traveled 5x',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      review: 'The curated tour packages are second to none. Our family getaway to Switzerland was flawless, every train and alpine excursion was timed to absolute perfection.'
    },
    {
      name: 'Elena Rostova',
      travelCount: 'Traveled 2x',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      review: 'From overwater bungalows in the Maldives to secluded beach shacks in Goa, TripSphere found gems we never would have discovered on our own.'
    }
  ];

  currentTestimonial = computed(() => this.testimonialsList[this.activeReviewIndex]);

  ngOnInit() {
    // Autoplay video check
  }

  toggleMute() {
    this.isVideoMuted.update(v => !v);
    if (this.heroVideoRef?.nativeElement) {
      this.heroVideoRef.nativeElement.muted = this.isVideoMuted();
    }
  }

  prevTestimonial() {
    this.activeReviewIndex =
      (this.activeReviewIndex - 1 + this.testimonialsList.length) %
      this.testimonialsList.length;
  }

  nextTestimonial() {
    this.activeReviewIndex =
      (this.activeReviewIndex + 1) % this.testimonialsList.length;
  }

  subscribeNewsletter() {
    if (this.newsletterEmail.trim()) {
      this.toastService.success('Thank you for subscribing to TripSphere travel inspiration!');
      this.newsletterEmail = '';
    }
  }
}
