import { Component, OnInit } from '@angular/core';

import { InventoryService } from '../inventory.service';

import { Item, Request, RequestItem } from '../inventory.model';

import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {

  //FIXME: fix approve component
  // requests$: Observable<RequestItem[]> ;
  
  // constructor(private inventoryService: InventoryService) { 
  // this.requests$ = inventoryService.getItemsByStatus('new');
  // }

  ngOnInit() {
  }

}
