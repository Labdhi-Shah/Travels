import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideIconComponent } from '../../../shared/icon/lucide-icon.component';
import { AuthService } from '../../../core/services/auth.service';
import { FavoriteService } from '../../../core/services/favorite.service';

type ProfileSection = 'info' | 'personal' | 'preferences' | 'saved' | 'settings';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideIconComponent],
  template: `
    <div class="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16 text-[#17202A]">
      
      <!-- Top Title Bar with "Edit Profile" Action (Section 24) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-[#D4A359]">
            TRAVELER CREDENTIALS
          </span>
          <h1 class="text-2xl sm:text-4xl font-bold font-display text-[#071F22] mt-0.5">
            Profile Dashboard
          </h1>
          <p class="text-xs sm:text-sm text-[#6B7280] font-light">
            Manage your personal traveler identity, travel preferences, and account configurations.
          </p>
        </div>

        <button
          type="button"
          (click)="isEditing = !isEditing"
          class="px-5 py-2.5 rounded-xl border border-[#071F22]/20 hover:bg-[#071F22] hover:text-white text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <app-icon [name]="isEditing ? 'check' : 'edit'" [size]="16"></app-icon>
          <span>{{ isEditing ? 'Done Editing' : 'Edit Profile' }}</span>
        </button>
      </div>

      <!-- Navigation Tabs across the 5 Sections (Section 24) -->
      <!-- Profile information | Personal details | Travel preferences | Saved destinations | Account settings -->
      <div class="flex items-center gap-2 border-b border-[#EFEDE7] pb-3 overflow-x-auto no-scrollbar">
        @for (sec of sections; track sec.id) {
          <button
            type="button"
            (click)="activeSection = sec.id"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2"
            [ngClass]="activeSection === sec.id
              ? 'bg-[#0A2D30] text-white shadow-sm'
              : 'bg-white text-[#6B7280] hover:bg-[#EFEDE7] border border-[#EFEDE7]'"
          >
            <app-icon [name]="sec.icon" [size]="14"></app-icon>
            <span>{{ sec.label }}</span>
          </button>
        }
      </div>

      <!-- Profile Form & Sections Content -->
      <form [formGroup]="profileForm" (ngSubmit)="onSave()" class="space-y-6">
        
        <!-- ============================================================== -->
        <!-- 1. PROFILE INFORMATION -->
        <!-- ============================================================== -->
        @if (activeSection === 'info') {
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#EFEDE7] shadow-sm space-y-6 animate-fade-in">
            <h3 class="text-xl font-bold font-display text-[#071F22]">Profile Information</h3>
            
            <div class="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#EFEDE7]">
              <div class="relative">
                <img
                  [src]="profileForm.get('avatar')?.value || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'"
                  alt="Profile Photo"
                  class="w-24 h-24 rounded-full object-cover border-4 border-[#EFEDE7] shadow-md shrink-0"
                />
                @if (isEditing) {
                  <span class="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#D4A359] text-white shadow">
                    <app-icon name="camera" [size]="12"></app-icon>
                  </span>
                }
              </div>

              <div class="space-y-1 text-center sm:text-left flex-1">
                <h4 class="text-xl font-bold text-[#071F22] font-display">
                  {{ profileForm.get('fullName')?.value || 'Alex Mercer' }}
                </h4>
                <p class="text-xs text-[#6B7280]">
                  Verified Commercial Member • Member since Jan 2026
                </p>
                <div class="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span class="px-2.5 py-0.5 rounded-full bg-[#D4A359]/15 text-[#B88738] text-[10px] font-bold">
                    14 Destinations Explored
                  </span>
                  <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                    Platinum Traveler
                  </span>
                </div>
              </div>
            </div>

            @if (isEditing) {
              <div class="space-y-1.5">
                <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280]">Avatar Image URL</label>
                <input
                  type="text"
                  formControlName="avatar"
                  class="w-full px-4 py-2.5 rounded-xl bg-[#EFEDE7]/40 border border-[#071F22]/10 text-xs focus:outline-none focus:border-[#D4A359]"
                />
              </div>
            }

            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280]">Bio / Traveler Manifest</label>
              <textarea
                formControlName="bio"
                [readonly]="!isEditing"
                rows="3"
                class="w-full px-4 py-2.5 rounded-xl bg-[#EFEDE7]/30 border border-[#071F22]/10 text-xs sm:text-sm focus:outline-none focus:border-[#D4A359]"
              ></textarea>
            </div>
          </div>
        }

        <!-- ============================================================== -->
        <!-- 2. PERSONAL DETAILS -->
        <!-- ============================================================== -->
        @if (activeSection === 'personal') {
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#EFEDE7] shadow-sm space-y-6 animate-fade-in">
            <h3 class="text-xl font-bold font-display text-[#071F22]">Personal Details</h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="space-y-1.5">
                <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280]">Full Legal Name</label>
                <input
                  type="text"
                  formControlName="fullName"
                  [readonly]="!isEditing"
                  class="w-full px-4 py-3 rounded-xl bg-[#EFEDE7]/30 border border-[#071F22]/10 text-sm font-semibold focus:outline-none focus:border-[#D4A359]"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280]">Email Address</label>
                <input
                  type="email"
                  formControlName="email"
                  [readonly]="!isEditing"
                  class="w-full px-4 py-3 rounded-xl bg-[#EFEDE7]/30 border border-[#071F22]/10 text-sm font-semibold focus:outline-none focus:border-[#D4A359]"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280]">Phone Number</label>
                <input
                  type="text"
                  formControlName="phone"
                  [readonly]="!isEditing"
                  class="w-full px-4 py-3 rounded-xl bg-[#EFEDE7]/30 border border-[#071F22]/10 text-sm font-semibold focus:outline-none focus:border-[#D4A359]"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280]">Home Country / Residence</label>
                <input
                  type="text"
                  formControlName="country"
                  [readonly]="!isEditing"
                  class="w-full px-4 py-3 rounded-xl bg-[#EFEDE7]/30 border border-[#071F22]/10 text-sm font-semibold focus:outline-none focus:border-[#D4A359]"
                />
              </div>
            </div>
          </div>
        }

        <!-- ============================================================== -->
        <!-- 3. TRAVEL PREFERENCES -->
        <!-- ============================================================== -->
        @if (activeSection === 'preferences') {
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#EFEDE7] shadow-sm space-y-6 animate-fade-in">
            <h3 class="text-xl font-bold font-display text-[#071F22]">Travel Preferences</h3>
            <p class="text-xs text-[#6B7280]">
              Customise how TripSphere suggests boutique accommodations and itineraries.
            </p>

            <div class="space-y-3">
              <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                Favorite Styles & Atmospheres
              </label>
              <div class="flex flex-wrap gap-2">
                @for (vib of availableVibes; track vib) {
                  <button
                    type="button"
                    (click)="toggleVibe(vib)"
                    [disabled]="!isEditing"
                    class="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    [ngClass]="selectedVibes.includes(vib)
                      ? 'bg-[#0A2D30] text-white shadow-sm ring-2 ring-[#D4A359]/50'
                      : 'bg-[#EFEDE7] text-[#17202A] hover:bg-[#EFEDE7]/70'"
                  >
                    {{ vib }}
                  </button>
                }
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#EFEDE7]">
              <div class="space-y-1">
                <label class="block text-xs font-bold uppercase text-[#6B7280]">Preferred Cabin Class</label>
                <select class="w-full px-4 py-2.5 rounded-xl bg-[#EFEDE7]/30 border border-[#071F22]/10 text-sm">
                  <option>Business Class Preferred</option>
                  <option>Premium Economy</option>
                  <option>First Class Suites</option>
                </select>
              </div>

              <div class="space-y-1">
                <label class="block text-xs font-bold uppercase text-[#6B7280]">Dietary Preferences</label>
                <select class="w-full px-4 py-2.5 rounded-xl bg-[#EFEDE7]/30 border border-[#071F22]/10 text-sm">
                  <option>No Restrictions (Seafood & Fine Dining)</option>
                  <option>Vegetarian / Vegan</option>
                  <option>Halal / Kosher</option>
                </select>
              </div>
            </div>
          </div>
        }

        <!-- ============================================================== -->
        <!-- 4. SAVED DESTINATIONS -->
        <!-- ============================================================== -->
        @if (activeSection === 'saved') {
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#EFEDE7] shadow-sm space-y-6 animate-fade-in">
            <div class="flex items-center justify-between pb-3 border-b border-[#EFEDE7]">
              <h3 class="text-xl font-bold font-display text-[#071F22]">Saved Destinations</h3>
              <a routerLink="/dashboard/favorites" class="text-xs font-bold text-[#D4A359] hover:underline">
                View All Wishlist →
              </a>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-3 rounded-2xl bg-[#EFEDE7]/40 border border-[#EFEDE7] flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=200&q=80" alt="Goa" class="w-12 h-12 rounded-xl object-cover shrink-0" />
                <div>
                  <h4 class="text-sm font-bold text-[#071F22]">Goa</h4>
                  <p class="text-[11px] text-[#6B7280]">India • 4.9★</p>
                </div>
              </div>

              <div class="p-3 rounded-2xl bg-[#EFEDE7]/40 border border-[#EFEDE7] flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=200&q=80" alt="Bali" class="w-12 h-12 rounded-xl object-cover shrink-0" />
                <div>
                  <h4 class="text-sm font-bold text-[#071F22]">Bali</h4>
                  <p class="text-[11px] text-[#6B7280]">Indonesia • 4.9★</p>
                </div>
              </div>

              <div class="p-3 rounded-2xl bg-[#EFEDE7]/40 border border-[#EFEDE7] flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=200&q=80" alt="Dubai" class="w-12 h-12 rounded-xl object-cover shrink-0" />
                <div>
                  <h4 class="text-sm font-bold text-[#071F22]">Dubai</h4>
                  <p class="text-[11px] text-[#6B7280]">UAE • 4.8★</p>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- ============================================================== -->
        <!-- 5. ACCOUNT SETTINGS -->
        <!-- ============================================================== -->
        @if (activeSection === 'settings') {
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#EFEDE7] shadow-sm space-y-6 animate-fade-in">
            <h3 class="text-xl font-bold font-display text-[#071F22]">Account Settings</h3>

            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 rounded-2xl bg-[#EFEDE7]/30 border border-[#EFEDE7]">
                <div>
                  <p class="text-sm font-bold text-[#071F22]">Flight Gate & Itinerary SMS Notifications</p>
                  <p class="text-xs text-[#6B7280]">Receive real-time departure and schedule updates.</p>
                </div>
                <input type="checkbox" checked class="w-5 h-5 accent-[#0A2D30] cursor-pointer" />
              </div>

              <div class="flex items-center justify-between p-4 rounded-2xl bg-[#EFEDE7]/30 border border-[#EFEDE7]">
                <div>
                  <p class="text-sm font-bold text-[#071F22]">Weekly Editorial Dispatch</p>
                  <p class="text-xs text-[#6B7280]">Get destination essays and member deals in your inbox.</p>
                </div>
                <input type="checkbox" checked class="w-5 h-5 accent-[#0A2D30] cursor-pointer" />
              </div>

              <div class="flex items-center justify-between p-4 rounded-2xl bg-[#EFEDE7]/30 border border-[#EFEDE7]">
                <div>
                  <p class="text-sm font-bold text-[#071F22]">Two-Factor Authentication (2FA)</p>
                  <p class="text-xs text-[#6B7280]">Extra security layer for booking payments and itineraries.</p>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                  Enabled
                </span>
              </div>
            </div>
          </div>
        }

        <!-- Save Button (Active when in edit mode) -->
        @if (isEditing) {
          <div class="flex justify-end pt-4 animate-fade-in">
            <button
              type="submit"
              class="px-8 py-3.5 rounded-xl bg-[#0A2D30] hover:bg-[#D4A359] text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        }

      </form>

    </div>
  `
})
export class ProfileComponent implements OnInit {
  authService = inject(AuthService);
  favoriteService = inject(FavoriteService);
  private fb = inject(FormBuilder);

  isEditing = false;
  activeSection: ProfileSection = 'info';

  sections: { id: ProfileSection; label: string; icon: string }[] = [
    { id: 'info', label: 'Profile Information', icon: 'user' },
    { id: 'personal', label: 'Personal Details', icon: 'file-text' },
    { id: 'preferences', label: 'Travel Preferences', icon: 'sparkles' },
    { id: 'saved', label: 'Saved Destinations', icon: 'heart' },
    { id: 'settings', label: 'Account Settings', icon: 'settings' }
  ];

  availableVibes = ['Relaxation', 'Luxury', 'Culture', 'Adventure', 'Food & Dining', 'Photography', 'Nature'];
  selectedVibes = ['Relaxation', 'Luxury', 'Culture'];

  profileForm: FormGroup = this.fb.group({
    fullName: ['Alex Mercer', Validators.required],
    email: ['alex.mercer@tripsphere.travel', [Validators.required, Validators.email]],
    phone: ['+1 (555) 234-5678', Validators.required],
    country: ['United States', Validators.required],
    avatar: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'],
    bio: ['Architect of slow journeys, coastal sanctuaries, and cultural deep-dives across Asia and Europe.']
  });

  ngOnInit() {
    const user = this.authService.currentUser();
    if (user) {
      this.profileForm.patchValue({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone || '+1 (555) 234-5678',
        avatar: user.avatar
      });
    }
  }

  toggleVibe(vibe: string) {
    if (!this.isEditing) return;
    if (this.selectedVibes.includes(vibe)) {
      this.selectedVibes = this.selectedVibes.filter(v => v !== vibe);
    } else {
      this.selectedVibes.push(vibe);
    }
  }

  onSave() {
    if (this.profileForm.valid) {
      this.authService.updateProfile(this.profileForm.value);
      this.isEditing = false;
    }
  }
}
