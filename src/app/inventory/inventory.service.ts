import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Item, Request, RequestItem } from './inventory.model';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';
import { FirebaseApp} from 'angularfire2' ;
import 'firebase/storage';

@Injectable()
export class InventoryService {
    item: Item;
    items: AngularFireList<Item>;
    requests: AngularFireList<Request>;
    constructor(private db: AngularFireDatabase,private authService: AuthService,
        private firebaseApp: FirebaseApp) {
        this.items = this.db.list<Item>('/items');
        this.requests = this.db.list<Request>('/requests');
    }

    getAllItems(): Observable<Item[]> {
        return this.items.snapshotChanges().map((arr) => {
          return arr.map((snap) => Object.assign(snap.payload.val(), { $key: snap.key }) );
        });
    }

    getAllRequests(): Observable<Request[]> {
        return this.requests.snapshotChanges().map((arr) => {
          return arr.map((snap) => Object.assign(snap.payload.val(), { $key: snap.key }) );
        });
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
        return this.getAllRequests()
        .map(requestList => requestList.filter(request => request.status == "new"))
        .map(
            requestList => requestList.map(request => this.db.object<Item>('items/' + request.itemId)
                .valueChanges()
                .map((item) => {
                    let newItem: Item = item as Item;
                    newItem.$key = request.itemId;
                    return new RequestItem(request, newItem)
                }
                )))
            .flatMap(fobjs => Observable.combineLatest(fobjs));
    }

    approveItem(req: RequestItem) {
        this.db.object('requests/' + req.request.$key + '/status').set('approved')
        .then
        this.db.database.ref('items/' + req.item.$key + '/totalItems')
        .transaction(quantity => { return quantity - req.request.quantity } );
    }

    declineItem($key: string) {
        this.requests.remove($key);
    }

    getProfilePic() {
        const storageRef = this.firebaseApp.storage().ref();
        let imageUrl ;
        return storageRef.child("images/" +
                                this.authService.getEmail() + "/" +
                                this.authService.getUID()
        ).getDownloadURL();
    }

    uploadProfilePic(file: File) {
    const storageRef = this.firebaseApp.storage().ref().child("images/" + 
                                                                this.authService.getEmail() + "/" +
                                                                this.authService.getUID());
    return storageRef.put(file);
    }
}
