import { Component, HostListener, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App implements OnInit, OnDestroy {
  private observer!: MutationObserver;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) return;

    this.observer = new MutationObserver((mutations) => {
      let shouldRestore = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          shouldRestore = true;
          break;
        }
      }
      if (shouldRestore) {
        this.restoreFormData();
      }
    });
    
    this.observer.observe(document.body, { childList: true, subtree: true });
    
    // Initial restore
    setTimeout(() => this.restoreFormData(), 100);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  @HostListener('window:input', ['$event'])
  @HostListener('window:change', ['$event'])
  onInput(event: Event) {
    if (!this.isBrowser) return;
    
    const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    if (target && target.tagName && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
      // Must have name or id to be uniquely identified
      if (!target.name && !target.id) return;
      
      // Ignore passwords, hidden fields, and submit buttons
      if (target.type === 'password' || target.type === 'hidden' || target.type === 'submit') return;
      
      const key = this.getStorageKey(target);
      if (target.type === 'checkbox' || target.type === 'radio') {
        localStorage.setItem(key, (target as HTMLInputElement).checked.toString());
      } else {
        localStorage.setItem(key, target.value);
      }
    }
  }

  private getStorageKey(el: HTMLElement & { id?: string, name?: string }): string {
    const path = window.location.pathname;
    const identifier = el.name || el.id;
    return `autosave_${path}_${identifier}`;
  }

  private restoreFormData() {
    if (!this.isBrowser) return;
    
    const inputs = document.querySelectorAll('input:not([type="password"]):not([type="hidden"]):not([type="submit"]), textarea, select');
    inputs.forEach((el: any) => {
      if (el.name || el.id) {
        const key = this.getStorageKey(el);
        const saved = localStorage.getItem(key);
        if (saved !== null) {
          if (el.type === 'checkbox' || el.type === 'radio') {
            const isChecked = saved === 'true';
            if (el.checked !== isChecked) {
              el.checked = isChecked;
              el.dispatchEvent(new Event('change', { bubbles: true }));
            }
          } else {
            if (el.value !== saved) {
              el.value = saved;
              el.dispatchEvent(new Event('input', { bubbles: true }));
            }
          }
        }
      }
    });
  }
}
