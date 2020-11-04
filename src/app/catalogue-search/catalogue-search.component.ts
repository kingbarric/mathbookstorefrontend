
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-catalogue-search',
  templateUrl: './catalogue-search.component.html',
  styleUrls: ['./catalogue-search.component.css']
})
export class CatalogueSearchComponent implements OnInit {
  form: FormGroup;
  constructor(private router: ActivatedRoute, private route: Router,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.init();
  }
  init() {
    this.form = new FormGroup({
      lowerPrice: new FormControl('', [Validators.required]),
      upperPrice: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required])
    }, {
      // validator: this.MustMatch('password', 'confirmPassword')
    });
  }

  search(){
    const data = this.form.value;
    console.log(data);
    this.route.navigate(['/result-page'],
       { queryParams: { lowerPrice: data.lowerPrice, upperPrice: data.upperPrice, category: data.category, author: data.author} });

  }
}
