import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideIconComponent } from '../icon/lucide-icon.component';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, LucideIconComponent],
  template: `
    <div class="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl border border-dashed border-[#EFEDE7] shadow-sm">
      <div class="w-16 h-16 rounded-2xl bg-[#EFEDE7] text-[#0B1320] flex items-center justify-center mb-4">
        <app-icon [name]="iconName" [size]="28"></app-icon>
      </div>
      <h3 class="text-xl font-serif font-bold text-[#0B1320]">{{ title }}</h3>
      <p class="text-sm text-[#6B7280] max-w-sm mt-1.5 mb-6">{{ description }}</p>
      <button
        *ngIf="actionLabel"
        (click)="action.emit()"
        type="button"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#071F22] hover:bg-[#D4A359] hover:text-[#071F22] text-white font-medium text-xs uppercase tracking-wider transition-all duration-300 shadow-sm"
      >
        <app-icon *ngIf="actionIcon" [name]="actionIcon" [size]="15"></app-icon>
        {{ actionLabel }}
      </button>
    </div>
  `
})
export class EmptyStateComponent {
  @Input() iconName = 'compass';
  @Input() title = 'No items found';
  @Input() description = 'Nothing here yet. Start your next journey by exploring or creating new plans.';
  @Input() actionLabel = '';
  @Input() actionIcon = 'plus';
  @Output() action = new EventEmitter<void>();
}
