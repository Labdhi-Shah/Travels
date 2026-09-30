import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideIconComponent } from '../../shared/icon/lucide-icon.component';
import { BookingService } from '../../core/services/booking.service';
import { ToastService } from '../../core/services/toast.service';

interface FlightItem {
  id: string;
  airline: string;
  flightNumber: string;
  logo: string;
  originCode: string;
  originCity: string;
  departureTime: string;
  destinationCode: string;
  destinationCity: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  price: number;
  cabinClass: string;
  availableSeats: number;
}

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideIconComponent],
  template: `
    <div class="min-h-screen bg-[#F8FAFC] pb-24 text-[#0F1E26] selection:bg-[#D4A359] selection:text-[#071F22]">
      
      <!-- HERO HEADER -->
      <section class="relative bg-gradient-to-b from-[#071F22] via-[#0A2D30] to-[#0D383C] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div class="absolute inset-0 bg-radial-gradient from-transparent via-[#071F22]/40 to-[#071F22]/90 pointer-events-none"></div>
        
        <div class="relative z-10 max-w-5xl mx-auto text-center space-y-4">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#D4A359] text-xs font-bold tracking-widest uppercase">
            <span>PREMIUM AVIATION</span>
          </div>

          <h1 class="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white">
            Find & Book Worldwide Flights
          </h1>
          <p class="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Direct airline inventory, privileged business class upgrades, and smooth booking directly integrated with your trip dashboard.
          </p>

          <!-- Search Widget Card -->
          <div class="bg-white rounded-3xl p-5 sm:p-7 shadow-2xl text-slate-800 text-left mt-8 border border-slate-100">
            <div class="flex items-center gap-4 border-b border-slate-100 pb-4 mb-5">
              <label class="flex items-center gap-2 cursor-pointer text-xs font-bold">
                <input type="radio" [(ngModel)]="tripType" value="roundtrip" class="text-[#0C3B3E] focus:ring-0" />
                <span>Round Trip</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-500">
                <input type="radio" [(ngModel)]="tripType" value="oneway" class="text-[#0C3B3E] focus:ring-0" />
                <span>One Way</span>
              </label>
              <div class="ml-auto">
                <select [(ngModel)]="selectedClass" class="text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business Class</option>
                  <option value="First">First Class</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- Origin -->
              <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-400">FROM</span>
                <input type="text" [(ngModel)]="origin" placeholder="e.g. New York (JFK)" class="w-full bg-transparent font-bold text-sm text-slate-800 focus:outline-none" />
              </div>

              <!-- Destination -->
              <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-400">TO</span>
                <input type="text" [(ngModel)]="destination" placeholder="e.g. Paris (CDG)" class="w-full bg-transparent font-bold text-sm text-slate-800 focus:outline-none" />
              </div>

              <!-- Date -->
              <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-400">DEPARTURE</span>
                <input type="date" [(ngModel)]="departDate" class="w-full bg-transparent font-bold text-sm text-slate-800 focus:outline-none" />
              </div>

              <!-- Search CTA -->
              <div class="flex items-end">
                <button
                  type="button"
                  (click)="filterFlights()"
                  class="w-full py-3.5 rounded-2xl bg-[#0C3B3E] hover:bg-[#072527] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <app-icon name="search" [size]="16"></app-icon>
                  <span>Search Flights</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- FLIGHTS LIST SECTION -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div class="space-y-4">
          
          <div class="flex items-center justify-between text-xs font-semibold text-slate-500 pb-2">
            <span>Showing {{ filteredFlightsList.length }} verified scheduled flights</span>
            <div class="flex items-center gap-2">
              <span>Sort by:</span>
              <select [(ngModel)]="sortBy" (change)="sortFlights()" class="bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium">
                <option value="cheapest">Cheapest Price</option>
                <option value="fastest">Shortest Duration</option>
                <option value="airline">Airline</option>
              </select>
            </div>
          </div>

          @for (flight of filteredFlightsList; track flight.id) {
            <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
              
              <!-- Airline & Logo -->
              <div class="flex items-center gap-4 min-w-[200px]">
                <div class="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-bold text-sm text-[#0C3B3E] border border-slate-200 shadow-sm shrink-0">
                  {{ flight.logo }}
                </div>
                <div>
                  <h3 class="font-bold text-base text-slate-900 leading-tight">{{ flight.airline }}</h3>
                  <span class="text-xs text-slate-400 font-medium">{{ flight.flightNumber }} &bull; {{ flight.cabinClass }}</span>
                </div>
              </div>

              <!-- Time & Route Flow -->
              <div class="flex-1 flex items-center justify-center gap-6 sm:gap-10">
                <!-- Departure -->
                <div class="text-right">
                  <span class="text-xl sm:text-2xl font-black text-slate-900 block font-display">{{ flight.departureTime }}</span>
                  <span class="text-xs font-bold text-slate-500">{{ flight.originCode }}</span>
                  <span class="text-[11px] text-slate-400 block">{{ flight.originCity }}</span>
                </div>

                <!-- Flight Path Graphic -->
                <div class="flex flex-col items-center min-w-[120px] sm:min-w-[150px]">
                  <span class="text-[11px] font-bold text-slate-500 mb-1">{{ flight.duration }}</span>
                  <div class="relative w-full flex items-center">
                    <div class="w-2 h-2 rounded-full border-2 border-[#D4A359] bg-white"></div>
                    <div class="flex-1 border-t-2 border-dashed border-slate-300 mx-1"></div>
                    <app-icon name="paper-plane" [size]="14" extraClass="text-[#0C3B3E] -rotate-90"></app-icon>
                    <div class="flex-1 border-t-2 border-dashed border-slate-300 mx-1"></div>
                    <div class="w-2 h-2 rounded-full border-2 border-[#0C3B3E] bg-[#0C3B3E]"></div>
                  </div>
                  <span class="text-[10px] text-emerald-600 font-bold mt-1">{{ flight.stops }}</span>
                </div>

                <!-- Arrival -->
                <div class="text-left">
                  <span class="text-xl sm:text-2xl font-black text-slate-900 block font-display">{{ flight.arrivalTime }}</span>
                  <span class="text-xs font-bold text-slate-500">{{ flight.destinationCode }}</span>
                  <span class="text-[11px] text-slate-400 block">{{ flight.destinationCity }}</span>
                </div>
              </div>

              <!-- Price & Booking CTA -->
              <div class="flex items-center justify-between md:flex-col md:items-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div class="text-left md:text-right">
                  <span class="text-2xl sm:text-3xl font-extrabold text-[#0C3B3E] block font-display leading-tight">
                    \${{ flight.price }}
                  </span>
                  <span class="text-[11px] text-slate-400">per traveler &bull; taxes incl.</span>
                </div>

                <button
                  type="button"
                  (click)="bookFlight(flight)"
                  class="px-6 py-2.5 rounded-full bg-[#D4A359] hover:bg-[#E5A93C] text-[#071F22] font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  Book Seat
                </button>
              </div>

            </div>
          }

        </div>
      </section>

      <!-- BOOKING CONFIRMATION MODAL -->
      @if (bookingSuccess) {
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl border border-slate-100">
            <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h3 class="text-2xl font-bold font-display text-slate-900">Flight Seat Reserved!</h3>
            <p class="text-xs sm:text-sm text-slate-500">
              Your flight ticket for <span class="font-bold text-slate-800">{{ bookedFlight?.airline }} ({{ bookedFlight?.flightNumber }})</span> has been saved to your dashboard bookings.
            </p>
            <div class="flex items-center gap-3 pt-2">
              <button
                type="button"
                (click)="bookingSuccess = false"
                class="flex-1 py-3 rounded-full border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <a
                routerLink="/bookings"
                class="flex-1 py-3 rounded-full bg-[#0C3B3E] hover:bg-[#D4A359] hover:text-[#0C3B3E] text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer transition-all flex items-center justify-center"
              >
                View Bookings
              </a>
            </div>
          </div>
        </div>
      }

    </div>
  `
})
export class FlightsComponent {
  private bookingService = inject(BookingService);
  private toastService = inject(ToastService);

  tripType = 'roundtrip';
  selectedClass = 'Economy';
  origin = '';
  destination = '';
  departDate = '2026-10-15';
  sortBy = 'cheapest';

  bookingSuccess = false;
  bookedFlight: FlightItem | null = null;

  flightsList: FlightItem[] = [
    {
      id: 'fl-1',
      airline: 'Emirates',
      flightNumber: 'EK-204',
      logo: 'EK',
      originCode: 'JFK',
      originCity: 'New York',
      departureTime: '11:20 AM',
      destinationCode: 'DXB',
      destinationCity: 'Dubai',
      arrivalTime: '07:45 AM',
      duration: '12h 25m',
      stops: 'Non-stop',
      price: 840,
      cabinClass: 'Economy',
      availableSeats: 5
    },
    {
      id: 'fl-2',
      airline: 'Singapore Airlines',
      flightNumber: 'SQ-22',
      logo: 'SQ',
      originCode: 'SIN',
      originCity: 'Singapore',
      departureTime: '09:15 AM',
      destinationCode: 'DPS',
      destinationCity: 'Bali',
      arrivalTime: '11:55 AM',
      duration: '2h 40m',
      stops: 'Non-stop',
      price: 290,
      cabinClass: 'Economy',
      availableSeats: 8
    },
    {
      id: 'fl-3',
      airline: 'Air France',
      flightNumber: 'AF-11',
      logo: 'AF',
      originCode: 'JFK',
      originCity: 'New York',
      departureTime: '06:30 PM',
      destinationCode: 'CDG',
      destinationCity: 'Paris',
      arrivalTime: '08:00 AM',
      duration: '7h 30m',
      stops: 'Non-stop',
      price: 720,
      cabinClass: 'Economy',
      availableSeats: 4
    },
    {
      id: 'fl-4',
      airline: 'Swiss International Air Lines',
      flightNumber: 'LX-19',
      logo: 'LX',
      originCode: 'LHR',
      originCity: 'London',
      departureTime: '08:45 AM',
      destinationCode: 'ZRH',
      destinationCity: 'Zurich',
      arrivalTime: '11:35 AM',
      duration: '1h 50m',
      stops: 'Non-stop',
      price: 195,
      cabinClass: 'Economy',
      availableSeats: 12
    },
    {
      id: 'fl-5',
      airline: 'Qatar Airways',
      flightNumber: 'QR-674',
      logo: 'QR',
      originCode: 'LHR',
      originCity: 'London',
      departureTime: '02:15 PM',
      destinationCode: 'MLE',
      destinationCity: 'Maldives',
      arrivalTime: '06:40 AM',
      duration: '10h 25m',
      stops: '1-Stop (DOH)',
      price: 890,
      cabinClass: 'Economy',
      availableSeats: 6
    },
    {
      id: 'fl-6',
      airline: 'All Nippon Airways (ANA)',
      flightNumber: 'NH-107',
      logo: 'NH',
      originCode: 'SFO',
      originCity: 'San Francisco',
      departureTime: '12:30 PM',
      destinationCode: 'HND',
      destinationCity: 'Tokyo',
      arrivalTime: '03:50 PM',
      duration: '10h 20m',
      stops: 'Non-stop',
      price: 940,
      cabinClass: 'Economy',
      availableSeats: 7
    }
  ];

  filteredFlightsList = [...this.flightsList];

  filterFlights() {
    let res = [...this.flightsList];
    if (this.origin.trim()) {
      const q = this.origin.trim().toLowerCase();
      res = res.filter(f => f.originCity.toLowerCase().includes(q) || f.originCode.toLowerCase().includes(q));
    }
    if (this.destination.trim()) {
      const q = this.destination.trim().toLowerCase();
      res = res.filter(f => f.destinationCity.toLowerCase().includes(q) || f.destinationCode.toLowerCase().includes(q));
    }
    this.filteredFlightsList = res;
    this.sortFlights();
  }

  sortFlights() {
    if (this.sortBy === 'cheapest') {
      this.filteredFlightsList.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'fastest') {
      this.filteredFlightsList.sort((a, b) => a.duration.localeCompare(b.duration));
    } else if (this.sortBy === 'airline') {
      this.filteredFlightsList.sort((a, b) => a.airline.localeCompare(b.airline));
    }
  }

  bookFlight(flight: FlightItem) {
    this.bookingService.addBooking({
      tripId: 'goa-sun-and-sand',
      title: `${flight.airline} Flight ${flight.flightNumber}`,
      category: 'Flights',
      date: this.departDate,
      time: flight.departureTime,
      location: `${flight.originCode} → ${flight.destinationCode}`,
      price: flight.price,
      currency: 'USD',
      status: 'Confirmed',
      confirmationCode: 'TS-FLIGHT-' + Math.floor(100000 + Math.random() * 900000),
      details: `Class: ${this.selectedClass}. Duration: ${flight.duration}. Carrier: ${flight.airline}`
    });

    this.bookedFlight = flight;
    this.bookingSuccess = true;
    this.toastService.success(`Flight seat on ${flight.airline} confirmed!`);
  }
}
