import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent} from './views/home/home.component';
import { CrudComponent } from './views/product/crud/crud.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';

const routes: Routes = [{
    path: "",
    component: HomeComponent
},
{
    path: "products",
    component: CrudComponent
}, 
{
  path:"products/create",
  component: ProductCreateComponent
},
{
  path:"products/update/:id",
  component: ProductUpdateComponent
},
{
  path:"products/delete/:id",
  component: ProductDeleteComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
