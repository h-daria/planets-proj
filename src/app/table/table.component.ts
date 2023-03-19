import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { PlanetData } from '../interfaces/planet-data';
import { PlanetsDataService } from '../services/planets-data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public columns = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (planet: PlanetData) => `${planet.name}`,
    },
    {
      columnDef: 'diameter',
      header: 'Diameter',
      cell: (planet: PlanetData) => `${planet.diameter}`,
    },
    {
      columnDef: 'climate',
      header: 'Climate',
      cell: (planet: PlanetData) => `${planet.climate}`,
    },
    {
      columnDef: 'population',
      header: 'Population',
      cell: (planet: PlanetData) => `${planet.population}`,
    },
  ];
  public planetsData: PlanetData[] = [];
  public dataSource: MatTableDataSource<PlanetData> =
    new MatTableDataSource<PlanetData>();

  public displayedColumns = this.columns.map((c) => c.columnDef);
  public resultsLength = 0;
  public isLoadingResults = true;
  public isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public pageEvent!: PageEvent;

  constructor(
    private planetsDataService: PlanetsDataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getData(0);
  }

  getData(pageNumber: number): void {
    this.planetsDataService.getPlanetsData(pageNumber).subscribe((data) => {
      this.isLoadingResults = false;
      this.isRateLimitReached = data === null;
      this.planetsData = data.results;
      this.resultsLength = data.count;
      this.dataSource = new MatTableDataSource(this.planetsData);
    });
  }

  changePage(pageEvent: PageEvent) {
    this.planetsDataService
      .getPlanetsData(pageEvent.pageIndex)
      .subscribe((data) => {
        this.isLoadingResults = false;
        this.isRateLimitReached = data === null;
        this.planetsData = data.results;
        this.resultsLength = data.count;
        this.dataSource = new MatTableDataSource(this.planetsData);
      });
  }

  showPlanetResidents(url: string) {
    this.dialog.open(DialogComponent, {
      data: url
    });
  }
}
