import { Route } from '../../../core/models/route.model';
import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'src/app/core/services/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public appService: AppService) {

  }

  ngOnInit(): void {
  }

}
