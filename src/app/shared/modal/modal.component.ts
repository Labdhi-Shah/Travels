import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideIconComponent } from '../icon/lucide-icon.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, LucideIconComponent],
  template: `
    <div
      *ngIf="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-[#0B1320]/70 backdrop-blur-sm transition-opacity animate-modal-backdrop"
        (click)="closeModal()"
      ></div>

      <!-- Modal Card -->
      <div
        class="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-[#EFEDE7] animate-modal-card"
        [ngClass]="maxWidthClass"
        (click)="$event.stopPropagation()"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-[#EFEDE7] bg-[#F8F7F3]">
          <div class="flex items-center gap-3">
            <div *ngIf="iconName" class="w-10 h-10 rounded-2xl bg-[#EFEDE7] text-[#0B1320] flex items-center justify-center">
              <app-icon [name]="iconName" [size]="18"></app-icon>
            </div>
            <div>
              <h3 class="text-lg font-serif font-bold text-[#0B1320]">{{ title }}</h3>
              <p *ngIf="subtitle" class="text-xs text-[#6B7280] mt-0.5">{{ subtitle }}</p>
            </div>
          </div>
          <button
            type="button"
            (click)="closeModal()"
            class="w-8 h-8 rounded-full text-[#6B7280] hover:text-[#0B1320] hover:bg-[#EFEDE7] flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <app-icon name="x" [size]="18"></app-icon>
          </button>
        </div>

        <!-- Content -->
        <div class="p-6 max-h-[75vh] overflow-y-auto">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title: string | undefined = '';
  @Input() subtitle: string | undefined = '';
  @Input() iconName = '';
  @Input() maxWidthClass = 'max-w-lg';
  @Output() close = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}
