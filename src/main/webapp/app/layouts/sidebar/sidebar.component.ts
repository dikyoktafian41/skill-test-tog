import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isSidebarOpen = false;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.document.body.classList.add('sidebar-open');
    this.document.body.classList.add('layout-fixed');
  }

  toggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
