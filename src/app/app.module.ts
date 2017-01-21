import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { VmsComponent } from './vms/vms.component';
import { VmComponent } from './vm/vm.component';
import { VmserviceApiService } from './vmservice-api.service';
import { CostsComponent } from './costs/costs.component';
import { CustomersComponent } from './customers/customers.component';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        VmsComponent,
        VmComponent,
        CostsComponent,
        CustomersComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        ROUTING
    ],
    providers: [VmserviceApiService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
