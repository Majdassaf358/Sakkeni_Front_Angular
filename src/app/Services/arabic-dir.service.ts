import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArabicDirService {

  constructor() { }
  toggleExternalStyles(selectedLanguage: string) {
    if (selectedLanguage == 'en') {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach((link) => {
        if (link.getAttribute('href') === 'assets/css/ar.css') {
          link.remove();
        }
      });
    } else if (selectedLanguage == 'ar') {
      const linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'stylesheet');
      linkElement.setAttribute('type', 'text/css');
      linkElement.setAttribute('href', 'assets/css/ar.css');
      document.head.appendChild(linkElement);
    }
  }
}
