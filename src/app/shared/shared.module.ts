import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppConfirmComponent } from './components/app-confirm/app-confirm.component';
import { AppConfirmService } from './components/app-confirm/app-confirm.service';
import { BubbleComponent } from './components/bubble/bubble.component';
import { SnackbarWrapperService } from './services/snackbar-wrapper-service';
import { DecimalOnlyDirective } from './directives/decimal-only.directive';
import { HighchartsChartModule } from 'highcharts-angular';
import { FooterComponent } from './components/footer/footer.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TableViewComponent } from './components/table-view/table-view.component';
import { LocalStorageReaderService } from './services/local-storage/local-storage-reader.service';
import { LocalStorageWriterService } from './services/local-storage/local-storage-writer.service';
import { LocalStorage } from './services/local-storage/local-storage';

@NgModule({
  declarations: [NavBarComponent, AppConfirmComponent, BubbleComponent, DecimalOnlyDirective, FooterComponent, TableViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    HighchartsChartModule,
    NgxDatatableModule
  ],
  exports: [NavBarComponent, AppConfirmComponent, BubbleComponent,
    MaterialModule, FormsModule, ReactiveFormsModule, DecimalOnlyDirective,
    HighchartsChartModule, FooterComponent, NgxDatatableModule, TableViewComponent],
  entryComponents: [AppConfirmComponent]
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [
        AppConfirmService,
        SnackbarWrapperService,
        LocalStorage,
        LocalStorageReaderService,
        LocalStorageWriterService
			]
		};
	}
}
