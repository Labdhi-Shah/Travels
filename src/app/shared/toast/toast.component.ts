import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastItem } from '../../core/services/toast.service';
import { LucideIconComponent } from '../icon/lucide-icon.component';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, LucideIconComponent],
  template: `
    <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl shadow-2xl border backdrop-blur-md transition-all duration-300 transform translate-y-0"
          [ngClass]="{
            'bg-[#0B1320]/95 border-emerald-500/40 text-white': toast.type === 'success',
            'bg-[#0B1320]/95 border-[#F4A261]/40 text-white': toast.type === 'warning',
            'bg-[#0B1320]/95 border-rose-500/40 text-white': toast.type === 'error',
            'bg-[#0B1320]/95 border-[#D4A359]/40 text-white': toast.type === 'info'
          }"
        >
          <div class="flex items-center gap-3">
            @if (toast.type === 'success') {
              <div class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <app-icon name="check" [size]="18"></app-icon>
              </div>
            } @else if (toast.type === 'warning') {
              <div class="w-8 h-8 rounded-xl bg-[#F4A261]/20 text-[#F4A261] flex items-center justify-center shrink-0">
                <app-icon name="alert-circle" [size]="18"></app-icon>
              </div>
            } @else if (toast.type === 'error') {
              <div class="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <app-icon name="x" [size]="18"></app-icon>
              </div>
            } @else {
              <div class="w-8 h-8 rounded-xl bg-[#D4A359]/20 text-[#D4A359] flex items-center justify-center shrink-0">
                <app-icon name="info" [size]="18"></app-icon>
              </div>
            }
            <p class="text-sm font-medium leading-snug font-sans">{{ toast.message }}</p>
          </div>
          <button
            (click)="toastService.remove(toast.id)"
            class="text-white/60 hover:text-white transition p-1 rounded-lg hover:bg-white/10 shrink-0"
            aria-label="Close notification"
          >
            <app-icon name="x" [size]="16"></app-icon>
          </button>
        </div>
      }
    </div>
  `
})
export class ToastComponent {
  toastService = inject(ToastService);
}
