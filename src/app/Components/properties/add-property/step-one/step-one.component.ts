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
import { MessageComponent } from '../../../message/message.component';

@Component({
  selector: 'app-step-one',
  imports: [CommonModule, MessageComponent],
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
  previewImages: string[] = [];
  previewSignatures: string[] = [];

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
    this.processFiles(input.files);
    // reset so same file can be selected again if needed
    if (input) input.value = '';
  }

  // Drag handlers
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    const dt = event.dataTransfer;
    if (!dt) return;
    this.processFiles(dt.files);
  }

  // shared file-processing routine
  private processFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;

    const imagesArray = this.form.get('stepOne.images') as FormArray;

    Array.from(fileList).forEach((file: File) => {
      // optionally filter non-images (defensive)
      if (!file.type.startsWith('image/')) return;

      const signature = `${file.name}_${file.size}`;
      if (this.fileSignatures.has(signature)) {
        // duplicate, skip
        return;
      }

      // add signature trackers
      this.fileSignatures.add(signature);
      this.previewSignatures.push(signature);

      // push file into FormArray so the form contains File objects for upload later
      imagesArray.push(new FormControl(file));

      // make preview
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImages.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  // remove image at index (updates previews, signatures set, and FormArray)
  removeImage(index: number) {
    const imagesArray = this.form.get('stepOne.images') as FormArray;
    if (index < 0 || index >= this.previewImages.length) return;

    const sig = this.previewSignatures[index];
    if (sig) {
      this.fileSignatures.delete(sig);
      this.previewSignatures.splice(index, 1);
    }

    this.previewImages.splice(index, 1);

    // remove form control at same index if exists
    if (imagesArray && imagesArray.length > index) {
      imagesArray.removeAt(index);
    }
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
