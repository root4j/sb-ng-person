import { Component, OnInit } from '@angular/core';
import { Dpto } from '../interfaces/dpto';
import { DptoService } from './dpto.service';

@Component({
  selector: 'app-dpto',
  templateUrl: './dpto.component.html',
  styleUrls: ['./dpto.component.css']
})
export class DptoComponent implements OnInit {
  data: Dpto[] = [];
  isLoadingResults = true;
  displayedColumns = ['codigo', 'nombre'];

  constructor(private dptoService: DptoService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.dptoService.getAll()
      .subscribe((res: any) => {
        this.data = res;
        this.isLoadingResults = false;
      }, err => {
        console.error(err);
        this.isLoadingResults = false;
      });
  }
}