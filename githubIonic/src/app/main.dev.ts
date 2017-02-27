import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import {ColorPickerService} from 'ct-angular2-color-picker/component'

platformBrowserDynamic().bootstrapModule(AppModule, [ColorPickerService]);
