import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { InventoryService } from '../inventory.service';
import { Item } from '../inventory.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  itemList: Item[] = [];
  selectedItem: Item;
  @ViewChild('addItemModal') public addItemModal: ModalDirective ;
  @ViewChild('editItemModal') public editItemModal: ModalDirective ;

  constructor(private inventoryService: InventoryService) { 
  inventoryService.getAllItems().subscribe(
      data => this.itemList = data
    );
  }

  ngOnInit() {
  }

  onAddItem(form: NgForm) {
    const name = form.value.itemName;
    const cost = form.value.cost;
    const purchaseDate = form.value.purchaseDate;
    const serialNum = form.value.serialNum;
    const category = form.value.category;
    const comments = form.value.comments;
    const totalItems = form.value.totalItems;
    const currency = form.value.currency;
    
    const item: Item = new Item(serialNum,name,cost,totalItems,purchaseDate,category,currency,comments);
    this.inventoryService.addItem(item);
    form.reset();
  }

   onSaveItem(form: NgForm) {
    console.log(form);
    const name = form.value.itemName;
    const cost = form.value.cost;
    const purchaseDate = form.value.purchaseDate;
    const serialNum = form.value.serialNum;
    const category = form.value.category;
    const comments = form.value.comments;
    const totalItems = form.value.totalItems;
    const currency = form.value.currency;
    

    let editedItem = new Item(serialNum,name,cost,totalItems,purchaseDate,category,currency,comments);
    editedItem.serialNum = editedItem.serialNum.length === 0 ? this.selectedItem.serialNum : editedItem.serialNum ;
    editedItem.name = editedItem.name.length === 0 ? this.selectedItem.name : editedItem.name ;
    editedItem.totalItems = editedItem.totalItems.toString.length === 0 ? this.selectedItem.totalItems : editedItem.totalItems ;
    editedItem.category = editedItem.category.length === 0 ? this.selectedItem.category : editedItem.category ;
    editedItem.cost = editedItem.cost.toString.length === 0 ? this.selectedItem.cost : editedItem.cost ;
    editedItem.currency = editedItem.currency.length === 0 ? this.selectedItem.currency : editedItem.currency ;
    editedItem.purchaseDate = !editedItem.purchaseDate ? this.selectedItem.purchaseDate : editedItem.purchaseDate ;
    editedItem.comments = editedItem.comments.length === 0 ? this.selectedItem.comments : editedItem.comments ;
    
    this.inventoryService.editItem(this.selectedItem.$key,editedItem);
    this.editItemModal.hide();
  }

  onDeleteByItemKey(key: string) {
    this.inventoryService.deleteItemByKey(key);
  }
  onSelectByItemKey(key: string) {
    this.selectedItem = this.itemList.filter(x => x.$key === key)[0];
    this.editItemModal.show();
  }
}
