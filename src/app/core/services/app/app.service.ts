import { Route } from '../../../core/models/route.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() {}

  public routes: Route[] = []
}
