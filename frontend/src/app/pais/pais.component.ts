import { Component, OnInit } from '@angular/core';
import { Pais } from '../interfaces/pais';
import { PaisService } from './pais.service';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {
  data: Pais[] = [];
  isLoadingResults = true;
  displayedColumns = ['codigo', 'nombre'];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.paisService.getAll()
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}