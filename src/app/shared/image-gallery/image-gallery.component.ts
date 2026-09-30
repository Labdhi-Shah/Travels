import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideIconComponent } from '../icon/lucide-icon.component';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule, LucideIconComponent],
  template: `
    @if (isOpen) {
      <div
        class="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-200"
        (click)="closeOnBackdrop($event)"
      >
        <!-- Top Bar -->
        <div class="w-full max-w-6xl flex items-center justify-between z-10 text-white">
          <div class="flex items-center gap-3">
            <span class="text-xs font-semibold tracking-wider uppercase px-3 py-1 bg-white/10 rounded-full text-white/90">
              Gallery
            </span>
            <span class="text-sm font-medium text-white/70">
              {{ activeIndex + 1 }} / {{ images.length }}
            </span>
          </div>

          <button
            (click)="closeGallery()"
            type="button"
            class="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition hover:scale-105 cursor-pointer"
            title="Close Gallery (Esc)"
          >
            <app-icon name="x" [size]="20"></app-icon>
          </button>
        </div>

        <!-- Center Image View with Prev / Next -->
        <div class="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4 overflow-hidden">
          <!-- Prev Button -->
          <button
            (click)="prevImage($event)"
            type="button"
            class="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md transition hover:scale-110 cursor-pointer"
            title="Previous (Left Arrow)"
          >
            <app-icon name="chevron-left" [size]="24"></app-icon>
          </button>

          <!-- Main Image -->
          <img
            [src]="images[activeIndex]"
            class="max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl transition duration-300 transform scale-100"
            alt="Expanded gallery view"
          />

          <!-- Next Button -->
          <button
            (click)="nextImage($event)"
            type="button"
            class="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md transition hover:scale-110 cursor-pointer"
            title="Next (Right Arrow)"
          >
            <app-icon name="chevron-right" [size]="24"></app-icon>
          </button>
        </div>

        <!-- Bottom Thumbnails -->
        <div class="w-full max-w-4xl flex items-center justify-center gap-2 overflow-x-auto py-2 px-4 no-scrollbar">
          @for (img of images; track $index) {
            <button
              (click)="selectImage($index, $event)"
              type="button"
              class="relative w-16 h-12 sm:w-20 sm:h-14 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer"
              [ngClass]="activeIndex === $index ? 'border-[#E76F51] scale-105 opacity-100 ring-2 ring-[#E76F51]/40' : 'border-transparent opacity-50 hover:opacity-80'"
            >
              <img [src]="img" class="w-full h-full object-cover" alt="thumbnail" />
            </button>
          }
        </div>
      </div>
    }
  `
})
export class ImageGalleryComponent {
  @Input() images: string[] = [];
  @Input() activeIndex: number = 0;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (!this.isOpen) return;

    if (event.key === 'Escape') {
      this.closeGallery();
    } else if (event.key === 'ArrowLeft') {
      this.prevImage();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
    }
  }

  closeGallery() {
    this.close.emit();
  }

  closeOnBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeGallery();
    }
  }

  nextImage(event?: MouseEvent) {
    if (event) event.stopPropagation();
    if (this.images.length === 0) return;
    this.activeIndex = (this.activeIndex + 1) % this.images.length;
  }

  prevImage(event?: MouseEvent) {
    if (event) event.stopPropagation();
    if (this.images.length === 0) return;
    this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
  }

  selectImage(index: number, event?: MouseEvent) {
    if (event) event.stopPropagation();
    this.activeIndex = index;
  }
}
