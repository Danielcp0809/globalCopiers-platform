import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  route = 'Empresas / Angular form'

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

}
