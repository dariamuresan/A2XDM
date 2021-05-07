import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminRestService } from './admin-rest.service';



@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent implements OnInit {

  @ViewChild('adminForm') adminForm: NgForm;
  quantity : number = 1;
  year : number = 2021;

  allowedToFetch : boolean = true;

  constructor(private adminService : AdminRestService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.allowedToFetch = false;

    this.adminService.fetchMovies(this.year, this.quantity).subscribe(() => { 
    alert('Fetched !');
    this.allowedToFetch = true; });
  }

}
