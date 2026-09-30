import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center p-8 text-center" [class.min-h-[300px]]="fullHeight">
      <div class="relative w-12 h-12">
        <div class="w-12 h-12 rounded-full border-4 border-[#EFEDE7] border-t-[#0A2D30] animate-spin"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-3 h-3 bg-[#D4A359] rounded-full"></div>
        </div>
      </div>
      <p *ngIf="message" class="mt-4 text-xs font-semibold uppercase tracking-wider text-[#6B7280] font-sans">{{ message }}</p>
    </div>
  `
})
export class LoaderComponent {
  @Input() message = 'Loading breathtaking adventures...';
  @Input() fullHeight = true;
}
