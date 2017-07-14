import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Item } from './inventory.model';

@Injectable()
export class InventoryService{
item: Item ;
items: FirebaseListObservable<any[]>;
constructor(private db: AngularFireDatabase) {
    this.items = this.db.list('/items');
}

getAllItems() {
    return this.items.map(
        (data) => data.map(x => x as Item)
    );
}

deleteItemByKey($key: string) {
    this.items.remove($key);
}

addItem(item: Item) {
    this.items.push(item);
}

editItem(key: string,item: Item) {
    this.db.object('items/'+key).update(item);
}

}