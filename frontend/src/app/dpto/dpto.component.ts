import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Dpto } from '../interfaces/dpto';
import { DptoService } from './dpto.service';

@Component({
  selector: 'app-dpto',
  templateUrl: './dpto.component.html',
  styleUrls: ['./dpto.component.css']
})
export class DptoComponent implements OnInit {
  displayedColumns = ['codigo', 'nombre'];
  dataSource: MatTableDataSource<Dpto>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dptoService: DptoService) { }

  ngOnInit(): void {
    this.getAll();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAll(): void {
    this.dptoService.getAll()
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        console.error(err);
      });
  }
}