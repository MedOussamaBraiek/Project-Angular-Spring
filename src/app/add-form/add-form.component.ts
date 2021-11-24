import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  constructor(private ac: ActivatedRoute) { }

  ngOnInit(): void {
    this.ac.paramMap.subscribe(p => console.log(p.get('id')))
  }

}
