import { Component, ViewChild, ElementRef, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QRCodeComponent } from 'angularx-qrcode';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, QRCodeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  @ViewChild('qrCodeContainer') qrCodeContainer!: ElementRef;

  urlInput = signal('');
  alertsEnabled = signal(true);
  isOnline = signal(navigator.onLine);
  toasts = signal<Toast[]>([]);
  private toastId = 0;

  isValidUrl = computed(() => {
    const url = this.urlInput();
    if (!url) return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  });

  showQR = computed(() => this.isValidUrl());

  constructor() {
    window.addEventListener('online', () => {
      this.isOnline.set(true);
      this.showToast('You are back online!', 'success');
    });
    window.addEventListener('offline', () => {
      this.isOnline.set(false);
      this.showToast('You are offline. App still works!', 'info');
    });
  }

  async pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      this.urlInput.set(text);
      if (this.isValidUrl()) {
        this.showToast('URL pasted successfully!', 'success');
      } else if (text) {
        this.showToast('Pasted text is not a valid URL', 'error');
      }
    } catch (err) {
      this.showToast('Unable to access clipboard', 'error');
    }
  }

  clearInput() {
    this.urlInput.set('');
    this.showToast('Input cleared', 'info');
  }

  downloadQR() {
    const qrContainer = this.qrCodeContainer?.nativeElement;
    if (qrContainer) {
      const canvas = qrContainer.querySelector('canvas') as HTMLCanvasElement;
      if (canvas) {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        this.showToast('QR code downloaded!', 'success');
        return;
      }
    }
    this.showToast('No QR code to download', 'error');
  }

  showToast(message: string, type: 'success' | 'error' | 'info') {
    if (!this.alertsEnabled()) return;
    
    const id = ++this.toastId;
    this.toasts.update(current => [...current, { id, message, type }]);
    
    setTimeout(() => {
      this.toasts.update(current => current.filter(t => t.id !== id));
    }, 3000);
  }

  removeToast(id: number) {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }

  toggleAlerts() {
    this.alertsEnabled.update(v => !v);
  }

  getToastClasses(type: string): string {
    const base = 'flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg transform transition-all duration-300';
    switch (type) {
      case 'success':
        return `${base} bg-emerald-500 text-white`;
      case 'error':
        return `${base} bg-red-500 text-white`;
      default:
        return `${base} bg-indigo-500 text-white`;
    }
  }

  getToastIcon(type: string): string {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      default:
        return 'ℹ';
    }
  }
}
