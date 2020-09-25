import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';

@Directive({
  selector: '[appHasPatente]'
})
export class HasPatenteDirective {

    @Input('appHasPatente') patente: string;
    constructor(private authService: AuthService, private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef) { }
  
    ngOnInit(): void {
      this.authService.getUserSubject().subscribe(_ => {
        if (this.authService.hasPatente(this.patente)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
    }
  
  }