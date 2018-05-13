import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
	itemsRef: AngularFireList<any>;
	items: Observable<any[]>;
	projectsObservable: Observable<any[]>;
	constructor(private db: AngularFireDatabase) { }
	ngOnInit() {
	  this.itemsRef = this.db.list('messages');
	  // Use snapshotChanges().map() to store the key
	  this.items = this.itemsRef.snapshotChanges().map(changes => {
	    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
	  });
	}
	addItem(newName: string) {
	  this.itemsRef.push({ text: newName,created:(new Date()).toLocaleString(),modified:(new Date()).toLocaleString() });
	}
	updateItem(key: string, newText: string) {
	  this.itemsRef.update(key, { text: newText,modified:(new Date()).toLocaleString()});
	}
	deleteItem(key: string) {    
	  this.itemsRef.remove(key); 
	}
	deleteEverything() {
	  this.itemsRef.remove();
	}
}
