import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent {
  editForm: FormGroup;
  portalOptions: string[] = ['portal', 'option2', 'option3'];
  typeOptions: string[] = ['type1', 'type2', 'type3'];

  constructor(
    private dialogRef: MatDialogRef<EditDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.formBuilder.group({
      marketingName: data.marketingName,
      technicalName: data.technicalName,
      description: data.description,
      portal: data.portal,
      type: data.type,
      startDate: data.startDate,
      finishDate: data.finishDate,
      radioValue: data.radioValue,
      selectedBackPromotionCheckbox: data.selectedBackPromotionCheckbox,
      selectedConnectPromotionCheckbox: data.selectedConnectPromotionCheckbox,
    });
  }

  save(): void {
    this.dialogRef.close(this.editForm.value);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
