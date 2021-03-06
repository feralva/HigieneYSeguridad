import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {

  @Input('appHasRole') roles: string[];
  constructor(private authService: AuthService, private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) { }

  ngOnInit(): void {
    this.authService.getUserSubject().subscribe(_ => {
      if (this.authService.hasRoles(this.roles)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

}
