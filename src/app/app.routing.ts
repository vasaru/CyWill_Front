/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { CostsComponent } from './costs/costs.component';
import { HomeComponent } from './home/home.component';
import { VmsComponent } from './vms/vms.component';
import { CustomersComponent } from './customers/customers.component';


export const ROUTES: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'costs', component: CostsComponent},
    {path: 'vms', component: VmsComponent},
    {path: 'customers', component: CustomersComponent}

];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
