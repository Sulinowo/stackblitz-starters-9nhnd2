import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDataService } from 'src/app/services/form-data.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
})
export class PromotionsComponent implements OnInit {
  formDataArray: any[] = [];
  displayedColumns: string[] = ['No.', 'Nazwa', 'Actions'];

  constructor(
    private formDataService: FormDataService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formDataService.loadFormDataArray();
    this.formDataService.formDataArray$.subscribe((data) => {
      this.formDataArray = data;
    });
  }

  editData(id: number): void {
    const dataToEdit = this.formDataArray.find((element) => element.id === id);

    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: { ...dataToEdit },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.formDataService.updateFormData(id, result);
      }
    });
  }

  deleteData(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: 'Czy na pewno chcesz usunąć tę promocję?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.formDataService.removeFormData(id);
      }
    });
  }

  navigateToAddPage(): void {
    this.router.navigate(['/']);
  }
}
