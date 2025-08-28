import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { LoaderComponent } from './shared/loader/loader/loader.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './shared/message/message.component';
import { MessageService, PopupPayload } from './Services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoaderComponent,
    SideBarComponent,
    CommonModule,
    MessageComponent,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  popupState: PopupPayload | null = null;
  private sub = new Subscription();
  title = 'dashboard';
  constructor(private router: Router, private messageService: MessageService) {}
  ngOnInit() {
    this.sub.add(
      this.messageService.popup$.subscribe((p) => (this.popupState = p))
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  get isLoginPage(): boolean {
    return this.router.url === '/login';
  }
  onPopupClosed() {
    this.messageService.close();
  }
}
