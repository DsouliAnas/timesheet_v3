import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  // Default settings
  defaultSettings = {
    theme: 'system',
    accentColor: '#3f51b5',
    language: 'en',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    analytics: true,
    crashReports: true
  };

  settings = {...this.defaultSettings};
  timezones: string[] = [];

  constructor(@Inject(TranslateService) private readonly translate: TranslateService) {}

  ngOnInit(): void {
    this.loadSettings();
    this.loadTimezones();
    this.applyTheme();
  }

  loadSettings(): void {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      this.settings = {...this.defaultSettings, ...JSON.parse(savedSettings)};
    }
  }

  loadTimezones(): void {
    // In a real app, you might want to use a proper timezone library
    this.timezones = [
      'UTC',
      'America/New_York',
      'America/Chicago',
      'America/Denver',
      'America/Los_Angeles',
      'Europe/London',
      'Europe/Paris',
      'Asia/Tokyo',
      'Australia/Sydney'
    ].sort();
  }

  setTheme(theme: string): void {
    this.settings.theme = theme;
    this.applyTheme();
  }

  applyTheme(): void {
    const theme = this.settings.theme === 'system' ? 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : 
      this.settings.theme;

    document.body.classList.toggle('dark-mode', theme === 'dark');
  }

  updateAccentColor(): void {
    document.documentElement.style.setProperty('--primary-color', this.settings.accentColor);
  }

  updateLanguage(): void {
    this.translate.use(this.settings.language);
  }

  saveSettings(): void {
    localStorage.setItem('appSettings', JSON.stringify(this.settings));
    this.applyTheme();
    this.updateAccentColor();
    this.updateLanguage();
    alert(this.translate.instant('SETTINGS.SAVED'));
  }

  resetToDefaults(): void {
    if (confirm(this.translate.instant('SETTINGS.RESET_CONFIRM'))) {
      this.settings = {...this.defaultSettings};
      this.saveSettings();
    }
  }
}