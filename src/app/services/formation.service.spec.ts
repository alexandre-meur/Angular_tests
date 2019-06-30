import { TestBed, inject } from '@angular/core/testing';
import { FormationService } from './formation.service';
import { Formation } from '../model/Formation';
import { FormationApi } from './formation.api';

describe('FormationServiceService', () => {

  beforeEach( () => {
    const apiFormation = new FormationApi();
    spyOn(apiFormation,'addFormation').and.callThrough();
    spyOn(apiFormation,'deleteFormation').and.callThrough();

    TestBed.configureTestingModule({
      providers:[
        {provide:FormationApi,useValue:apiFormation},
        FormationService
      ]
    });
  });

  it('should be created', inject([FormationService], (service:FormationService) =>
    {expect(service).toBeTruthy();
  }));

  it('should add a new formation with empty list',
    inject([FormationService, FormationApi], (service:FormationService,api:FormationApi) => {
      const formation: Formation = new Formation('test','description',1000);
      service.addFormation(formation);
      expect(service.getFormations()).toContain(formation);
      expect(api.addFormation).toHaveBeenCalledWith(formation);
    }));

  it('should have an empty list after deleting in an expty list',
    inject([FormationService, FormationApi], (service:FormationService, api: FormationApi) => {
      const formation: Formation = new Formation('test','description',1000);
      service.deleteFormation(formation);
      expect(service.getFormations()).toEqual([]);
      expect(api.deleteFormation).toHaveBeenCalledWith(formation);
    }));

    it('should have the same list when deleting a formation not in the list',
      inject([FormationService, FormationApi], (service:FormationService, api: FormationApi) => {
        const formation1: Formation = new Formation('test1','description1',1000);
        const formation2: Formation = new Formation('test2','description2',800);
        const formation3: Formation = new Formation('test3','description3',1200);
        const formation4: Formation = new Formation('test4','description4',900);
        service.addFormation(formation1);
        service.addFormation(formation2);
        service.addFormation(formation3);
        service.deleteFormation(formation4);
        expect(service.getFormations()).toEqual([formation1, formation2, formation3]);
        expect(api.deleteFormation).toHaveBeenCalledWith(formation4);
      }));

      it('should the same list minus the formation deleted if it\'s in the list',
        inject([FormationService, FormationApi], (service:FormationService, api: FormationApi) => {
          const formation1: Formation = new Formation('test1','description1',1000);
          const formation2: Formation = new Formation('test2','description2',800);
          const formation3: Formation = new Formation('test3','description3',1200);
          service.addFormation(formation1);
          service.addFormation(formation2);
          service.addFormation(formation3);
          service.deleteFormation(formation1);
          expect(service.getFormations()).toEqual([formation2, formation3]);
          expect(api.deleteFormation).toHaveBeenCalledWith(formation1);
        }));
  });
