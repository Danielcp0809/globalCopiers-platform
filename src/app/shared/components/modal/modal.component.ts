import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  @Input() modalClass!: string;
  @Input() contentClass!: string;
  @Input() modalID!: string;
  @Input() backDrop = false;

  constructor() { }

  ngOnInit(): void {
  }

  close(event: any) {
    document.querySelector('#' + event)?.classList.remove('md-show');
  }

}
