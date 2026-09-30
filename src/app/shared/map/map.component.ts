import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface MapMarker {
  lat: number;
  lng: number;
  title: string;
  description?: string;
  image?: string;
  type?: 'hotel' | 'attraction' | 'food' | 'default';
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full overflow-hidden rounded-3xl border border-[#EFEDE7] shadow-lg group">
      <!-- Leaflet Container -->
      <div #mapContainer [style.height]="height" class="w-full z-0 bg-[#EFEDE7]"></div>

      <!-- Floating Map Info Badge -->
      @if (title) {
        <div class="absolute top-3 left-3 z-10 pointer-events-none bg-[#0B1320]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 flex items-center gap-2 shadow-md">
          <span class="w-2 h-2 rounded-full bg-[#E76F51] animate-pulse"></span>
          <span class="text-xs font-semibold text-white tracking-wide uppercase">{{ title }}</span>
        </div>
      }

      <!-- Quick Reset View Button -->
      <button
        (click)="resetView()"
        type="button"
        class="absolute bottom-3 right-3 z-10 bg-white/95 hover:bg-white text-[#0B1320] hover:text-[#E76F51] text-xs font-semibold uppercase tracking-wider px-3.5 py-2 rounded-full shadow border border-[#EFEDE7] transition backdrop-blur-sm flex items-center gap-1.5 cursor-pointer"
        title="Reset Map View"
      >
        <svg class="w-3.5 h-3.5 text-[#E76F51]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke-width="2"></circle>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" stroke-width="2"></polygon>
        </svg>
        <span>Center</span>
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class MapComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  @Input() lat: number = 35.6762;
  @Input() lng: number = 139.6503;
  @Input() zoom: number = 12;
  @Input() title?: string;
  @Input() height: string = '380px';
  @Input() markers: MapMarker[] = [];

  private map: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      setTimeout(() => this.initMap(), 50);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map && (changes['lat'] || changes['lng'] || changes['markers'])) {
      this.updateMap();
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  resetView(): void {
    if (this.map && this.lat && this.lng) {
      this.map.setView([this.lat, this.lng], this.zoom);
    }
  }

  private async initMap(): Promise<void> {
    if (!this.mapContainer || !this.mapContainer.nativeElement) return;
    if (this.map) return;

    try {
      const L = await import('leaflet');

      this.map = L.map(this.mapContainer.nativeElement, {
        center: [this.lat, this.lng],
        zoom: this.zoom,
        zoomControl: true,
        scrollWheelZoom: false
      });

      // CartoDB Voyager
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(this.map);

      this.renderMarkers(L);

      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 300);
    } catch (err) {
      console.error('Error initializing Leaflet map:', err);
    }
  }

  private async updateMap(): Promise<void> {
    if (!this.map) return;
    const L = await import('leaflet');
    this.map.setView([this.lat, this.lng], this.zoom);
    this.renderMarkers(L);
  }

  private renderMarkers(L: any): void {
    if (!this.map) return;

    // Clear existing markers if any
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    const createCustomIcon = (color: string, iconType: string) => {
      let iconSvg = `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>`;

      if (iconType === 'hotel') {
        iconSvg = `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>`;
      } else if (iconType === 'food') {
        iconSvg = `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V4a2 2 0 114 0v4M6 8h12"></path>
        </svg>`;
      }

      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="background-color: ${color};" class="w-9 h-9 rounded-full border-2 border-white shadow-xl flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition hover:scale-110 cursor-pointer">
            ${iconSvg}
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20]
      });
    };

    // Add main marker
    const mainIcon = createCustomIcon('#0B1320', 'attraction');
    const mainMarker = L.marker([this.lat, this.lng], { icon: mainIcon }).addTo(this.map);
    if (this.title) {
      mainMarker.bindPopup(`
        <div style="min-width: 170px; font-family: 'Plus Jakarta Sans', sans-serif;">
          <h4 style="font-weight: 700; color: #0B1320; margin: 0 0 4px 0; font-size: 14px;">${this.title}</h4>
          <p style="color: #6B7280; font-size: 11px; margin: 0;">Main Destination Point</p>
        </div>
      `);
    }

    // Add additional markers if provided
    if (this.markers && this.markers.length > 0) {
      this.markers.forEach((m) => {
        const color = m.type === 'hotel' ? '#F4A261' : m.type === 'food' ? '#E76F51' : '#0B1320';
        const icon = createCustomIcon(color, m.type || 'attraction');
        const marker = L.marker([m.lat, m.lng], { icon }).addTo(this.map);

        let popupContent = `
          <div style="min-width: 200px; max-width: 240px; font-family: 'Plus Jakarta Sans', sans-serif; padding: 2px;">
            ${m.image ? `<img src="${m.image}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 12px; margin-bottom: 8px;" alt="${m.title}" />` : ''}
            <h4 style="font-weight: 700; color: #0B1320; font-size: 13px; margin: 0 0 4px 0;">${m.title}</h4>
            ${m.description ? `<p style="color: #6B7280; font-size: 11px; line-height: 1.4; margin: 0 0 6px 0;">${m.description}</p>` : ''}
            <a href="https://www.google.com/maps/search/?api=1&query=${m.lat},${m.lng}" target="_blank" rel="noopener" style="display: inline-block; color: #E76F51; font-weight: 600; font-size: 11px; text-decoration: underline;">
              Get Directions &rarr;
            </a>
          </div>
        `;
        marker.bindPopup(popupContent);
      });
    }
  }
}
