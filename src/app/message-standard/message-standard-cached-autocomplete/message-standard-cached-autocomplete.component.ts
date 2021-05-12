import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription }  from 'rxjs';
import { AppCacheService } from '../../app-cache.service';

@Component({
  selector: 'app-message-standard-cached-autocomplete',
  templateUrl: './message-standard-cached-autocomplete.component.html',
  styleUrls: ['./message-standard-cached-autocomplete.component.scss']
})
export class MessageStandardCachedAutocompleteComponent {
  @Input() operation: string = "";
  @Input() alea: string = ""
  @Output() aleaChange: EventEmitter<string> = new EventEmitter();
  fc = new FormControl();
  options: string[] = [];
  aleaUpdated: Subscription;

  constructor(
    private db: AppCacheService
  ) {
    this.refreshOptions();
    this.aleaUpdated = this.db.cacheUpdated.subscribe(
      data => this.refreshOptions()
    );
  }
  ngOnDestroy() {
    this.aleaUpdated.unsubscribe();
  }
  ngOnChanges(s: SimpleChanges) {
    if (s.hasOwnProperty('operation')) this.refreshOptions();
  }

  refreshOptions() {
    this.options = this.db.aleas.filter(
      al => (this.operation && this.operation.length > 0) ? 
        al.operation === this.operation : 
        true
    ).map(al => al.alea);
  }

}
