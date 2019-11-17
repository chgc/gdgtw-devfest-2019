import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'gdg-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [TitleCasePipe]
})
export class LayoutComponent {
  data = {};
  bannerImage = '';
  @ViewChild('menuControl') chkMenuControl: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private title: Title,
    private titleCase: TitleCasePipe
  ) {
    this.route.paramMap
      .pipe(
        map(params => params.get('city')),
        tap(city =>
          this.title.setTitle(
            `GDG DevFest ${this.titleCase.transform(city)} 2019`
          )
        ),
        switchMap(city => this.dataService.getData(city))
      )
      .subscribe({
        next: (data: any) => {
          // console.log(data);
          this.data = data;
          this.bannerImage = this.dataService.baseUrl + data.bannerImage;
        }
      });
  }
  hidMenu() {
    this.chkMenuControl.nativeElement.checked = false;
  }
  goTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
