import { Injectable } from'@angular/core';
import { Formation } from'../model/Formation';
import { FormationApi } from'./formation.api';

@Injectable({providedIn:'root'})
export class FormationService{

  constructor(private formationApi:FormationApi){}

  addFormation(formation:Formation){
    this.formationApi.addFormation(formation);
  }

  deleteFormation(formation: Formation){
    this.formationApi.deleteFormation(formation);
  }

  getFormations(){
    return this.formationApi.formations;
  }
}
