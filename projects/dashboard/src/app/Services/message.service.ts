import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PopupPayload {
  message: string;
  image: string;
  from: string;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  private subject = new BehaviorSubject<PopupPayload | null>(null);
  readonly popup$ = this.subject.asObservable();

  open(payload: PopupPayload) {
    this.subject.next(payload);
  }

  close() {
    this.subject.next(null);
  }
}
