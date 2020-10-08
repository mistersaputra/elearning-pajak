import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data/data.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-paper-work',
  templateUrl: './paper-work.page.html',
  styleUrls: ['./paper-work.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaperWorkPage implements OnInit {
  myForm: FormGroup;
  submitAttempt = false;
  data: any;
  columns: any;
  rows: any[] = [];
  editing = {};

  constructor(
    public platform: Platform,
    private router: Router,
    public formBuilder: FormBuilder,
    private dataService: DataService
  ) {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  ngOnInit() {
    this.columns = [
      { name: 'Name' },
      { name: 'Company' },
      { name: 'Genre' }
    ];

    this.data = {
      "movies": [
          {
              "name": "Escape Room",
              "company": "Columbia Pictures",
              "genre": "Horror"
          },
          {
              "name": "Rust Creek",
              "company": "IFC Films",
              "genre": "Drama"
          },
          {
              "name": "American Hangman",
              "company": "Hangman Productions",
              "genre": "Thriller"
          },
          {
              "name": "The Upside",
              "company": "STX Entertainment",
              "genre": "Comedy"
          },
          {
              "name": "Replicas",
              "company": "Entertainment Studios",
              "genre": "Sci-Fi"
          },
          {
              "name": "After Darkness",
              "company": "Grindstone Group",
              "genre": "Drama"
          },
          {
              "name": "Glass",
              "company": "Universal Pictures",
              "genre": "Superhero"
          },
          {
              "name": "Close",
              "company": "Netflix",
              "genre": "Action"
          },
          {
              "name": "The Final Wish",
              "company": "BondIt Capital",
              "genre": "Horror"
          },
          {
              "name": "Serenity",
              "company": "Aviron Pictures",
              "genre": "Drama"
          },
          {
              "name": "Miss Bala",
              "company": "Columbia Pictures",
              "genre": "Thriller"
          },
          {
              "name": "Velvet Buzzsaw",
              "company": "Netflix",
              "genre": "Comedy"
          }
      ]
    }

    this.rows = this.data.movies;

  }

  log(cell, rowIndex) {
    console.log(this.rows[rowIndex][cell])
    // console.log(this.editing)
  }

  updateValue(event, cell, rowIndex) {
    // this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

  ionViewWillEnter() {
  }
  
  ionViewWillLeave() {
  }
}