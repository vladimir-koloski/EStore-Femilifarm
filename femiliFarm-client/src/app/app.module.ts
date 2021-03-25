import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import {AppRoutingModule} from './app-routing.module';
import { AdminPanelService } from './services/admin-panel.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MapCategoryPipe } from './pipes/map-category.pipe';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { ProductService } from './services/product.service';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UserService } from './services/user.service';
import { AuthService } from './auth/auth.service';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { CartService } from './services/cart.service';
import { CartComponent } from './components/cart/cart.component';
import { SellComponent } from './components/sell/sell.component';
import { OrderService } from './services/order.service';
import { OrderComponent } from './components/order/order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminPanelComponent,
    FooterComponent,
    HeaderComponent,
    MapCategoryPipe,
    ProductsComponent,
    ProductComponent,
    ProductDetailsComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    ForbiddenComponent,
    CartComponent,
    SellComponent,
    OrderComponent,
    OrdersComponent,
    OrderDetailsComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    AdminPanelService,
    ProductService,
    UserService,
    AuthService,
    CartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
