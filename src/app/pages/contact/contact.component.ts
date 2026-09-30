import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideIconComponent } from '../../shared/icon/lucide-icon.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideIconComponent],
  template: `
    <div class="pt-28 pb-24 bg-[#F8F7F3] min-h-screen">
      
      <!-- Header -->
      <section class="bg-[#071F22] text-white py-20 px-4 sm:px-6 lg:px-8 mb-14 text-center relative overflow-hidden border-b border-[#D4A359]/20">
        <div class="absolute -top-32 -right-32 w-96 h-96 bg-[#D4A359]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="max-w-4xl mx-auto space-y-4 relative z-10">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#D4A359]/30 text-xs font-semibold text-[#D4A359] uppercase tracking-wider">
            <app-icon name="mail" [size]="13"></app-icon>
            24/7 Global Concierge & Support
          </div>
          <h1 class="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            Connect with <span class="italic font-normal text-[#D4A359]">TripSphere</span>
          </h1>
          <p class="text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-light leading-relaxed">
            Have questions about bespoke itineraries, private charters, or luxury hotel reservations? Our travel designers are here to assist.
          </p>
        </div>
      </section>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          <!-- Contact Form Card -->
          <div class="bg-white p-8 sm:p-10 rounded-3xl border border-[#EFEDE7] shadow-sm">
            <h2 class="text-2xl font-serif font-bold text-[#071F22] mb-1">Send an Inquiry</h2>
            <p class="text-xs text-[#6B7280] mb-6 font-medium">Our senior travel curators respond within 4 business hours.</p>

            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-5">
              <div>
                <label class="block text-[11px] font-bold text-[#071F22] uppercase tracking-wider mb-1.5">Full Name</label>
                <input
                  type="text"
                  formControlName="name"
                  placeholder="e.g. Alex Mercer"
                  class="w-full px-4 py-3 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7] text-sm text-[#071F22] focus:outline-none focus:border-[#D4A359] transition-colors"
                />
                <p *ngIf="contactForm.get('name')?.touched && contactForm.get('name')?.invalid" class="text-xs text-rose-500 mt-1">
                  Please enter your name.
                </p>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-[#071F22] uppercase tracking-wider mb-1.5">Email Address</label>
                <input
                  type="email"
                  formControlName="email"
                  placeholder="alex.mercer@example.com"
                  class="w-full px-4 py-3 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7] text-sm text-[#071F22] focus:outline-none focus:border-[#D4A359] transition-colors"
                />
                <p *ngIf="contactForm.get('email')?.touched && contactForm.get('email')?.invalid" class="text-xs text-rose-500 mt-1">
                  Please enter a valid email address.
                </p>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-[#071F22] uppercase tracking-wider mb-1.5">Destination of Interest</label>
                <input
                  type="text"
                  formControlName="destination"
                  placeholder="e.g. Bali, Japan, Swiss Alps, Amalfi Coast"
                  class="w-full px-4 py-3 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7] text-sm text-[#071F22] focus:outline-none focus:border-[#D4A359] transition-colors"
                />
              </div>

              <div>
                <label class="block text-[11px] font-bold text-[#071F22] uppercase tracking-wider mb-1.5">Your Inquiry / Message</label>
                <textarea
                  rows="4"
                  formControlName="message"
                  placeholder="Tell us about your target travel dates, guest count, and ideal trip style..."
                  class="w-full px-4 py-3 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7] text-sm text-[#071F22] focus:outline-none focus:border-[#D4A359] resize-none transition-colors"
                ></textarea>
                <p *ngIf="contactForm.get('message')?.touched && contactForm.get('message')?.invalid" class="text-xs text-rose-500 mt-1">
                  Message must be at least 10 characters.
                </p>
              </div>

              <button
                type="submit"
                [disabled]="contactForm.invalid || submitted"
                class="w-full py-4 px-6 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#0A2D30] disabled:opacity-50 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <app-icon name="send" [size]="15"></app-icon>
                <span>{{ submitted ? 'Message Dispatched!' : 'Send Travel Inquiry' }}</span>
              </button>

              <div *ngIf="submitted" class="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-semibold animate-fade-in text-center">
                Thank you! Your travel inquiry has been received. A dedicated specialist will be in touch shortly.
              </div>
            </form>
          </div>

          <!-- Contact Information & Office Details -->
          <div class="space-y-8">
            <div class="bg-[#071F22] text-white p-8 sm:p-10 rounded-3xl space-y-6 border border-[#D4A359]/20">
              <h3 class="text-2xl font-serif font-bold">Direct Concierge Desks</h3>
              
              <div class="space-y-5 text-sm">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-2xl bg-white/10 text-[#D4A359] flex items-center justify-center shrink-0">
                    <app-icon name="phone" [size]="17"></app-icon>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase tracking-wider font-semibold">VIP Phone Concierge</p>
                    <p class="font-medium text-white mt-0.5">+1 (800) 489-7241 / +44 20 7946 0192</p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-2xl bg-white/10 text-[#D4A359] flex items-center justify-center shrink-0">
                    <app-icon name="mail" [size]="17"></app-icon>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase tracking-wider font-semibold">Bespoke Inquiries</p>
                    <p class="font-medium text-white mt-0.5">concierge&#64;tripsphere.travel</p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-2xl bg-white/10 text-[#D4A359] flex items-center justify-center shrink-0">
                    <app-icon name="clock" [size]="17"></app-icon>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase tracking-wider font-semibold">Operating Standard</p>
                    <p class="font-medium text-white mt-0.5">Mon – Sun: 24/7 Global Coverage</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Global Offices Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="p-6 rounded-3xl bg-white border border-[#EFEDE7] shadow-sm">
                <p class="text-xs font-bold uppercase tracking-widest text-[#D4A359]">North America</p>
                <h4 class="text-base font-serif font-bold text-[#071F22] mt-1">San Francisco, USA</h4>
                <p class="text-xs text-[#6B7280] mt-1">500 Howard Street, Suite 400, CA 94105</p>
              </div>

              <div class="p-6 rounded-3xl bg-white border border-[#EFEDE7] shadow-sm">
                <p class="text-xs font-bold uppercase tracking-widest text-[#D4A359]">Europe</p>
                <h4 class="text-base font-serif font-bold text-[#071F22] mt-1">Paris, France</h4>
                <p class="text-xs text-[#6B7280] mt-1">24 Boulevard Saint-Germain, 75005 Paris</p>
              </div>

              <div class="p-6 rounded-3xl bg-white border border-[#EFEDE7] shadow-sm">
                <p class="text-xs font-bold uppercase tracking-widest text-[#D4A359]">Asia-Pacific</p>
                <h4 class="text-base font-serif font-bold text-[#071F22] mt-1">Tokyo, Japan</h4>
                <p class="text-xs text-[#6B7280] mt-1">Roppongi Hills Mori Tower, Minato City</p>
              </div>

              <div class="p-6 rounded-3xl bg-white border border-[#EFEDE7] shadow-sm">
                <p class="text-xs font-bold uppercase tracking-widest text-[#D4A359]">Middle East</p>
                <h4 class="text-base font-serif font-bold text-[#071F22] mt-1">Dubai, UAE</h4>
                <p class="text-xs text-[#6B7280] mt-1">DIFC Gate Village, Building 3</p>
              </div>
            </div>

          </div>
        </div>

        <!-- FAQs Accordion -->
        <div class="bg-white p-8 sm:p-12 rounded-3xl border border-[#EFEDE7] shadow-sm">
          <div class="text-center max-w-xl mx-auto mb-10">
            <span class="text-xs font-bold uppercase tracking-widest text-[#D4A359]">Frequently Asked</span>
            <h3 class="text-2xl sm:text-3xl font-serif font-bold text-[#071F22] mt-2">Questions & Curated Guidance</h3>
          </div>

          <div class="divide-y divide-[#EFEDE7] max-w-3xl mx-auto">
            <div *ngFor="let faq of faqs; let i = index" class="py-5">
              <button
                type="button"
                (click)="toggleFaq(i)"
                class="w-full flex items-center justify-between text-left text-base font-serif font-bold text-[#071F22] hover:text-[#D4A359] transition-colors cursor-pointer"
              >
                <span>{{ faq.question }}</span>
                <app-icon [name]="openFaqIndex === i ? 'chevron-up' : 'chevron-down'" [size]="16"></app-icon>
              </button>
              <p *ngIf="openFaqIndex === i" class="text-sm text-[#6B7280] mt-3 leading-relaxed animate-fade-in font-light">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  submitted = false;
  openFaqIndex: number | null = 0;

  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    destination: [''],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  readonly faqs = [
    {
      question: 'How does the TripSphere multi-step Trip Planner work?',
      answer: 'Our Trip Planner guides you through 6 intuitive steps: selecting your dream destination, specifying travel dates, defining guest counts, choosing travel preferences (adventure, luxury, culinary), setting a budget tier, and generating a personalized day-by-day itinerary that you can customize in your dashboard.'
    },
    {
      question: 'Can I customize packages or add extra days to an itinerary?',
      answer: 'Yes! Every tour package can be directly added to your personal dashboard where you can edit individual day activities, reorder timeline events, change hotel stays, and add extra destinations.'
    },
    {
      question: 'How are reservations and bookings persisted?',
      answer: 'All your created trips, itinerary modifications, flight and hotel reservations, and expense updates are saved locally in your browser storage. You can edit or delete them anytime, and they will persist whenever you revisit TripSphere.'
    },
    {
      question: 'What is the refund and cancellation policy for tour packages?',
      answer: 'Most luxury packages offer 100% risk-free cancellation up to 14 days before your scheduled departure date. Specific terms are detailed on each package breakdown page.'
    }
  ];

  toggleFaq(idx: number): void {
    this.openFaqIndex = this.openFaqIndex === idx ? null : idx;
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.submitted = true;
      setTimeout(() => {
        this.contactForm.reset();
        this.submitted = false;
      }, 4000);
    }
  }
}
