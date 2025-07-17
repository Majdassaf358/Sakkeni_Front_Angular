import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AddPropertyService } from '../../../../Services/add-property.service';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-one',
  imports: [CommonModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.css',
})
export class StepOneComponent {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  @Output() next = new EventEmitter<void>();
  private fileSignatures = new Set<string>();
  images: string[] = [];
  imagesUrl: string = 'http://127.0.0.1:8000/';
  isDragging = false;
  startX = 0;
  scrollLeft = 0;
  showMessagePopup = false;
  imageToShow: string = '';
  form: FormGroup;

  constructor(private formSvc: AddPropertyService) {
    this.form = this.formSvc.getForm();
  }

  private get imagesArray() {
    return this.form.get('stepOne.images') as FormArray;
  }
  saveAndNext() {
    this.next.emit();
  }
  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    Array.from(input.files).forEach((file: File) => {
      const signature = `${file.name}_${file.size}`;
      if (this.fileSignatures.has(signature)) {
        return;
      }
      this.fileSignatures.add(signature);
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        this.images.push(dataUrl);
        this.imagesArray.push(new FormControl(dataUrl));
      };
      reader.readAsDataURL(file);
    });
  }
  clearImages(): void {
    this.images = [];
    this.fileSignatures.clear();
    const imagesArray = this.imagesArray;
    while (imagesArray.length) {
      imagesArray.removeAt(0);
    }
  }

  openPopup(img: string) {
    this.imageToShow = img;
    this.showMessagePopup = true;
  }
  onPopupClosed() {
    this.showMessagePopup = false;
  }
  startDrag(event: MouseEvent): void {
    this.isDragging = true;
    this.scrollContainer.nativeElement.classList.add('dragging');
    this.startX = event.pageX - this.scrollContainer.nativeElement.offsetLeft;
    this.scrollLeft = this.scrollContainer.nativeElement.scrollLeft;
  }

  stopDrag(): void {
    this.isDragging = false;
    if (this.scrollContainer?.nativeElement) {
      this.scrollContainer.nativeElement.classList.remove('dragging');
    }
  }

  onDrag(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    const x = event.pageX - this.scrollContainer.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 2;
    this.scrollContainer.nativeElement.scrollLeft = this.scrollLeft - walk;
  }
}
