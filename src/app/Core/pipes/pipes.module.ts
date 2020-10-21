import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { LocalizedDatePipe } from './localized-date-pipe.pipe';



@NgModule({
  declarations: [ FiltroPipe, LocalizedDatePipe ],
  exports: [ FiltroPipe, LocalizedDatePipe ],
  imports: []
})
export class PipesModule { }
