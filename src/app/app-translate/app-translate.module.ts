import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
const httpLoaderFactor = (http: HttpClient) =>
  new TranslateHttpLoader(http, 'assets/i18n/', '.json');
const translateCompilerFactor = () => new TranslateMessageFormatCompiler();

const translateLoder: Provider = {
  provide: TranslateLoader,
  useFactory: httpLoaderFactor,
  deps: [HttpClient],
};

const translateCompiler: Provider = {
  provide: TranslateCompiler,
  useFactory: translateCompilerFactor,
};

@NgModule({})
export class AppTranslateModule {
  static forRoot(): ModuleWithProviders<AppTranslateModule> {
    return TranslateModule.forRoot({
      loader: translateLoder,
      compiler: translateCompiler,
    });
  }
  static forChild(): ModuleWithProviders<AppTranslateModule> {
    return TranslateModule.forRoot({
      loader: translateLoder,
      compiler: translateCompiler,
      isolate: false,
    });
  }
}
