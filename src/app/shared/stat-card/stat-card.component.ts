import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideIconComponent } from '../icon/lucide-icon.component';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, LucideIconComponent],
  template: `
    <div class="bg-white p-5 rounded-2xl border border-[#EFEDE7] shadow-sm hover:shadow-md transition-all flex items-center gap-4">
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        [ngClass]="iconBgClass"
      >
        <app-icon [name]="iconName" [size]="20" [extraClass]="iconColorClass"></app-icon>
      </div>
      <div>
        <p class="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">{{ label }}</p>
        <h4 class="text-2xl font-serif font-bold text-[#0B1320] mt-0.5">{{ value }}</h4>
        <p *ngIf="subtext" class="text-xs text-[#6B7280] mt-0.5">{{ subtext }}</p>
      </div>
    </div>
  `
})
export class StatCardComponent {
  @Input() iconName = 'compass';
  @Input() label = '';
  @Input() value: string | number = '';
  @Input() subtext = '';
  @Input() iconBgClass = 'bg-[#EFEDE7]';
  @Input() iconColorClass = 'text-[#0B1320]';
}
