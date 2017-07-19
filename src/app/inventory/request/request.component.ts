import { Component, OnInit } from '@angular/core';
import { Item, Request } from '../inventory.model';
import { InventoryService } from '../inventory.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  itemList: Item[] = [];
    constructor(private inventoryService: InventoryService, private authService: AuthService) { 
  inventoryService.getAllItems().subscribe(
      data => this.itemList = data
    )
  }
  ngOnInit() {
  }

  onRequestItem($key: string) {
    let request = new Request(this.authService.getEmail(),$key,1,'new');
    this.inventoryService.requestItem(request);
  }

}
