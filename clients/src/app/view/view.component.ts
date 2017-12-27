import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PaginationService } from '../pagination.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, public page: PaginationService) {
    const id: Observable<string> = route.params.map(p => p.id);
    const url: Observable<string> = route.url.map(segments => segments.join(''));
    // route.data includes both `data` and `resolve`
    const user = route.data.map(d => d.user);
  }

  ngOnInit() {

    // console.log(this.route.snapshot.params.name);
    // console.log(this.route.snapshot.params.id);
    this.page.init('posts', 'title', { reverse: false, prepend: false });
  }
  scrollHandler(e) {
    console.log(e);
    if (e === 'bottom') {
      this.page.more();
    }
    this.page.more();
    // if (e === 'top') {
    //   this.page.more()
    // }
  }

}
