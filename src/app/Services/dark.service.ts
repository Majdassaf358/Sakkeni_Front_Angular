import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkService {

  constructor() { }
  changeMode(mode: boolean) {
    if (mode == false) {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach((link) => {
        if (link.getAttribute('href') === 'assets/css/dark.css') {
          link.remove();
        }
      });
    } else {
      const linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'stylesheet');
      linkElement.setAttribute('type', 'text/css');
      linkElement.setAttribute('href', 'assets/css/dark.css');
      document.head.appendChild(linkElement);
    }
  }
}
