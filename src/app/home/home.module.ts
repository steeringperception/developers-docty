import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeRoutingModule } from './home-routing.module';
import { MatTreeModule } from '@angular/material/tree';
import { CommonsModule } from '@app/commons/commons.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSidenavModule,
    MatTreeModule,
    MatIconModule,
    CommonsModule,
    HttpClientModule,
    MatMenuModule,
    MatDividerModule
  ]
})
export class HomeModule { }
