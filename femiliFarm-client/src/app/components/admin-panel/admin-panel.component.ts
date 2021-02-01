import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Category, Product, ProductRequestModel } from 'src/app/models/product-model';
import { AdminPanelService } from 'src/app/services/admin-panel.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  modalRef: BsModalRef;

  products: any;  
  product: any;
  isEditMode: boolean = false;
  productId: number;

  requestForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    stock: new FormControl(''),
    imageUrl: new FormControl(''),
    category:  new FormControl('')
  })

  filterForm = new FormGroup({
    name: new FormControl('')
  })

  categoryFlterForm = new FormGroup({
    category:  new FormControl('')
  })

  categoryList = [Category.Baby, Category.Cosmetics, Category.Drugs, Category.OTC]

  constructor(private adminPanelService: AdminPanelService,
              private modalService: BsModalService,
              private router: Router) { }

  ngOnInit(): void { 
    this.getAllProducts()
  }

  addProduct(){
    let requestModel =  new ProductRequestModel();
    requestModel.Name = this.requestForm.value.name;
    requestModel.Description = this.requestForm.value.description;
    requestModel.Price = parseInt(this.requestForm.value.price);
    requestModel.Stock = parseInt(this.requestForm.value.stock);
    requestModel.ImageUrl = this.requestForm.value.imageUrl;
    requestModel.Category = parseInt(this.requestForm.value.category);

    
    this.adminPanelService.addProduct(requestModel).subscribe({
      error: err => console.warn(err),
      complete: () => {
        this.closeModal()
        this.getAllProducts()
      }
    })
  }

  editProduct() {
    let body = Object.assign(this.requestForm.value, { id : this.productId})
    body.Category = parseInt(body.Category)

    this.adminPanelService.updateProduct(body).subscribe({
      error: err => console.warn(err.error),
      complete: () => {
        this.closeModal()
        this.getAllProducts()
      }
    })
  }

  getAllProducts(){

    let filter = {
      name: this.filterForm.value.name,
      category: this.categoryFlterForm.value.category
    }        
    this.adminPanelService.getAllProducts(filter).subscribe({
      next: res => {
        this.products = res
      }
    })
  }

  deleteProduct(id: number){
    this.adminPanelService.deleteProduct(id).subscribe({      
      error: err => console.warn(err.error),
      complete: () => {
        this.getAllProducts()
      }
    })
  }

  cellProduct(id: number){
    this.adminPanelService.sellProduct(id).subscribe({
      next: res => {
        this.product = res
      },
      error: err => console.warn(err.error),
      complete: () => {
        this.getAllProducts()
        this.router.navigateByUrl("/sell")
      }
    })
  }

  openModal(template: TemplateRef<any>, product?: any) {
    this.modalRef = this.modalService.show(template);

    if(!product) {
      this.requestForm.get("category").setValue(Category.Baby)
    }

    if(!!product) {
      this.isEditMode = true;
      const {id, Name, ...rest} = product

      this.requestForm.setValue(rest)
      this.productId = id
    }
  }

  closeModal(){
    this.modalService._hideModal()
    this.modalService._hideBackdrop()
    this.isEditMode = false;
    this.requestForm.reset()
  }

}
