import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from '../service/crud.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {
  form: FormGroup;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  message = '';
  data;
  isbn=null;
  constructor(private crud: CrudService,private modalService: NgbModal, private route :ActivatedRoute,) { 
   
 
  }

  ngOnInit(): void {
    this.init();
    this.findAllBooks();
  }

  saveBook() {

    const data = this.form.value;
    data.image = this.cardImageBase64;
    console.log(data);
    if (!this.form.valid) {
      this.message = 'Please fill in all fields';
      Swal.fire('Oops!',this.message,'error');
      return;
    }
    if(this.isbn==null){
    this.crud.postAll('savebook', data)
      .then((e: any) => {
        this.message = e.message;
        
        Swal.fire("Okay",e.message,'success');
        this.findAllBooks();

        console.log(e);
        this.form.reset();
      }).catch((error) => {
        console.log('Error occured: ', error);
       // alert(error.message);
       Swal.fire("oops",error.message,'error');
      })
    }else{
      //update
      this.crud.update('updatebook', data)
      .then((e: any) => {
        this.message = e.messagae;
        Swal.fire("Okay",e.message,'success');
        this.findAllBooks();

        console.log(e);
        this.form.reset();
        window.location.href ='/maintanance-catalogue'
      }).catch((error) => {
        console.log('Error occured: ', error);
        alert(error.messagae);
      })
    }
  }

  init() {
    this.form = new FormGroup({
      isbn: new FormControl("", [Validators.required]),
      title: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
      publisher: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      quantity: new FormControl("", [Validators.required])
    }, {
      // validator: this.MustMatch('password', 'confirmPassword')
    })
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
      //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //     return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);


          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  findAllBooks() {
    this.crud.findAll("findallbook")
      .then((e: any) => {
        this.data = e;
        console.log(this.data);
      })
  }
  deleteBook(id) {
 
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Book !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.crud.delete("deletebook/" + id)
        .then((e: any) => {
          Swal.fire("Okay",e.message,'success');
          this.findAllBooks();
        })
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
     
      }
    })
  }

  open(content,data) {
    console.log(data);
    this.form.controls['isbn'].patchValue(data.isbn);
    this.form.controls['title'].patchValue(data.title);
    this.form.controls['category'].patchValue(data.category);
    this.form.controls['publisher'].patchValue(data.publisher);
    this.form.controls['price'].patchValue(data.price);
    this.form.controls['quantityOnHand'].patchValue(data.quantityOnHand);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  openModal(content) {
   
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
