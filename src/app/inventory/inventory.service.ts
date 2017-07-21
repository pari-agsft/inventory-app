import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Item, Request, RequestItem } from './inventory.model';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class InventoryService {
    item: Item;
    items: FirebaseListObservable<any[]>;
    requests: FirebaseListObservable<any[]>;
    constructor(private db: AngularFireDatabase) {
        this.items = this.db.list('/items');
        this.requests = this.db.list('/requests');
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

    editItem(key: string, item: Item) {
        this.db.object('items/' + key).update(item);
    }

    requestItem(request: Request) {
        this.requests.push(request);
    }

    getItemsByStatus(status: string) {
        const queryList$ = this.db.list('/requests', {
            query: {
                orderByChild: 'status',
                equalTo: status
            }
        })
        return queryList$.map(
            requestList => requestList.map(request => this.db.object('items/' + request.itemId)
                .map((item) => {
                    return new RequestItem(request as Request, item as Item)
                }
                )))
            .flatMap(fobjs => Observable.combineLatest(fobjs));
    }

    approveItem(req: RequestItem) {
        this.db.object('requests/' + req.request.$key + '/status').set('approved').then
        this.db.object('items/' + req.item.$key + '/totalItems').$ref
        .transaction(quantity => { return quantity - req.request.quantity } );
    }

    declineItem($key: string) {
        this.requests.remove($key);
    }

}