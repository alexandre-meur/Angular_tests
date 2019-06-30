import { Formation } from '../model/Formation';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class FormationApi{

	formations: Formation[] = [];

	constructor () {}

	addFormation(formation: Formation) {
		this.formations = [...this.formations, formation]
	}

	deleteFormation(formation: Formation) {
    this.formations = this.formations.filter( f => f !== formation);
  }
}
