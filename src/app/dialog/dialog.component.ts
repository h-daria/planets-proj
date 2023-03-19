import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, takeWhile } from 'rxjs';
import { PlanetData } from '../interfaces/planet-data';
import { ResidentData } from '../interfaces/resident-data';
import { PlanetsDataService } from '../services/planets-data.service';

export interface DialogData {
  url: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy {
  public planetData!: PlanetData;
  public residents: [] = [];
  public residentsData: ResidentData[] = [];
  public dataSource: MatTableDataSource<ResidentData> =
    new MatTableDataSource<ResidentData>();
  public columns = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (resident: ResidentData) => `${resident.name}`,
    },
    {
      columnDef: 'height',
      header: 'Height',
      cell: (resident: ResidentData) => `${resident.height}`,
    },
    {
      columnDef: 'birth_year',
      header: 'Birth Year',
      cell: (resident: ResidentData) => `${resident.birth_year}`,
    },
  ];
  public displayedColumns = this.columns.map((c) => c.columnDef);
  private isSubscribed: boolean = true;

  constructor(
    private planetsDataService: PlanetsDataService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.getPlanetResidents();
  }

  ngOnDestroy(): void {
    this.isSubscribed = false;
  }

  getPlanetResidents(): void {
    this.planetsDataService
      .getPlanetDataById(this.data)
      .pipe(takeWhile((_) => this.isSubscribed))
      .subscribe((data) => {
        this.residents = data.residents;
        this.residents.forEach((resident) => {
          this.planetsDataService
            .getResidentData(resident)
            .pipe(takeWhile((_) => this.isSubscribed))
            .subscribe((data) => {
              this.residentsData.push(data);
              if (this.residentsData.length === this.residents.length) {
                this.dataSource = new MatTableDataSource(this.residentsData);
              }
            });
        });
      });
  }
}
