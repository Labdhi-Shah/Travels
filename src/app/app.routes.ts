import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // ==========================================
  // PUBLIC WEBSITE ROUTES (PublicLayout)
  // ==========================================
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'destinations',
        loadComponent: () => import('./pages/destinations/destinations.component').then(m => m.DestinationsComponent)
      },
      {
        path: 'destinations/:id',
        loadComponent: () => import('./pages/destination-details/destination-details.component').then(m => m.DestinationDetailsComponent)
      },
      {
        path: 'packages',
        loadComponent: () => import('./pages/packages/packages.component').then(m => m.PackagesComponent)
      },
      {
        path: 'packages/:id',
        loadComponent: () => import('./pages/package-details/package-details.component').then(m => m.PackageDetailsComponent)
      },
      {
        path: 'hotels',
        loadComponent: () => import('./pages/hotels/hotels.component').then(m => m.HotelsComponent)
      },
      {
        path: 'hotels/:id',
        loadComponent: () => import('./pages/hotel-details/hotel-details.component').then(m => m.HotelDetailsComponent)
      },
      {
        path: 'flights',
        loadComponent: () => import('./pages/flights/flights.component').then(m => m.FlightsComponent)
      },
      {
        path: 'experiences',
        loadComponent: () => import('./pages/experiences/experiences.component').then(m => m.ExperiencesComponent)
      },
      {
        path: 'plan-trip',
        loadComponent: () => import('./pages/dashboard/create-trip/create-trip.component').then(m => m.CreateTripComponent)
      },
      {
        path: 'plan-my-trip',
        redirectTo: 'plan-trip',
        pathMatch: 'full'
      },
      {
        path: 'my-trips',
        loadComponent: () => import('./pages/dashboard/my-trips/my-trips.component').then(m => m.MyTripsComponent)
      },
      {
        path: 'my-trips/:id',
        loadComponent: () => import('./pages/dashboard/trip-details/trip-details.component').then(m => m.TripDetailsComponent)
      },
      {
        path: 'trips/:id',
        redirectTo: 'my-trips/:id',
        pathMatch: 'full'
      },
      {
        path: 'itinerary',
        loadComponent: () => import('./pages/dashboard/itinerary/itinerary.component').then(m => m.ItineraryComponent)
      },
      {
        path: 'itinerary/:id',
        loadComponent: () => import('./pages/dashboard/itinerary/itinerary.component').then(m => m.ItineraryComponent)
      },
      {
        path: 'favorites',
        loadComponent: () => import('./pages/dashboard/favorites/favorites.component').then(m => m.FavoritesComponent)
      },
      {
        path: 'budget',
        loadComponent: () => import('./pages/dashboard/budget/budget.component').then(m => m.BudgetComponent)
      },
      {
        path: 'bookings',
        loadComponent: () => import('./pages/dashboard/bookings/bookings.component').then(m => m.BookingsComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/dashboard/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./pages/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
      }
    ]
  },

  // ==========================================
  // USER WORKSPACE / DASHBOARD (DashboardLayout)
  // STRICTLY NO ADMIN PANEL / NO ADMIN ROUTES
  // ==========================================
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard-home/dashboard-home.component').then(m => m.DashboardHomeComponent)
      },
      {
        path: 'dashboard/create-trip',
        redirectTo: 'plan-trip',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/my-trips',
        redirectTo: 'my-trips',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/favorites',
        redirectTo: 'favorites',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/budget',
        redirectTo: 'budget',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/bookings',
        redirectTo: 'bookings',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/profile',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]
  },

  // Fallback 404
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
