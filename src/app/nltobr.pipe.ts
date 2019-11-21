import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'nltobr'
})
export class NltobrPipe implements PipeTransform {
  constructor(public domSanitizer: DomSanitizer) {}
  transform(value: any): any {
    const breakTag = '<br>';
    const replaceStr = '$1' + breakTag;
    return this.domSanitizer.bypassSecurityTrustHtml(
      (value + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr)
    );
  }
}
