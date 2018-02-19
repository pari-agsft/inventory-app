import { Component, OnInit ,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { InventoryService } from '../inventory/inventory.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   @ViewChild('home') signupForm: NgForm;
   @ViewChild('editItemModal') public editItemModal: ModalDirective ;

   imageUrl: string;

  user = {
    username: '',
    email: '',
    skype:'',
    mobile:'',
    linkedin:'',
    department:'',
    address:'',
    doj:'',
    designation:'',
    manager:'',
  };

  constructor(private inventoryService: InventoryService) { 
    inventoryService.getProfilePic().then(url => this.imageUrl = url);
  }

  ngOnInit() {
  }

  onSubmit() {
    alert("Not Implemented");
  }

  uploadProfilePic($event) {
    var file:File = $event.target.files[0];
    this.inventoryService.uploadProfilePic(file)
    .then( x => this.inventoryService.getProfilePic().then(url => this.imageUrl = url));
  }
}
