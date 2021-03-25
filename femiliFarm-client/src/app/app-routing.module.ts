import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { UserComponent } from './components/user/user.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AuthGuard } from './auth/aut.guard';
import { CartComponent } from './components/cart/cart.component';
import { SellComponent } from './components/sell/sell.component';
import { OrdersComponent} from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
    {path:'', redirectTo: '/home', pathMatch:'full'},
    {path:'home', component: HomeComponent},
    {path:'admin-panel', component: AdminPanelComponent, canActivate:[AuthGuard], data :{permittedRoles: ["ADMIN"]}},
    {path: 'products', component: ProductsComponent},
    {path: 'products/product-details/:id', component: ProductDetailsComponent},
    {path: 'forbidden', component: ForbiddenComponent},
    {path: 'cart', component: CartComponent},
    {path: 'sell', component: SellComponent},
    {path: 'user-list', component: UserListComponent},
    {path: 'user', component: UserComponent,
    children: [
        {path: 'register', component: RegisterComponent},
        {path: 'login', component: LoginComponent}
        ]
    },
    {path: 'orders', component: OrdersComponent},
    {path: 'orders/order-details/:id', component: OrderDetailsComponent}
    

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}