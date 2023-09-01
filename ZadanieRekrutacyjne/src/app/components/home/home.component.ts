import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selectedItem: string = 'DEFINITION';
  draftData: {
    marketingName?: string;
    technicalName?: string;
    description?: string;
    portal?: string;
    type?: string;
  } = {};
  isNameFilled: boolean = false;
  selectedPortalOption: string | null = null;
  selectedTypeOption: string | null = null;
  selectedStartDate: Date = new Date('');
  selectedFinishDate: Date = new Date('');
  selectedRadioValue: string | null = null;
  selectedConnectPromotionsCheckbox: boolean = false;
  selectedBackPromotionCheckbox: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private formDataService: FormDataService
  ) {}

  ngOnInit(): void {
    this.loadDrafts();
  }

  selectItem(item: string) {
    if (this.canSelectItem(item)) {
      this.selectedItem = item;
    }
  }

  saveDraft(key: string, event: any): void {
    const value = event.target.value;
    localStorage.setItem(`${key}`, value);

    if (key === 'marketingName' || key === 'technicalName') {
      this.loadDrafts();
      this.updateIsNameFilled();
    }
  }

  saveSelectValue(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  saveDateValue(key: string, value: Date): void {
    localStorage.setItem(key, value.toISOString());
  }

  saveRadioValue(value: string): void {
    localStorage.setItem('radioValue', value);
  }

  saveCheckboxValue(key: string, value: boolean): void {
    localStorage.setItem(key, value.toString());
  }

  loadDrafts(): void {
    this.draftData.marketingName = localStorage.getItem('marketingName') || '';
    this.draftData.technicalName = localStorage.getItem('technicalName') || '';
    this.draftData.description = localStorage.getItem('description') || '';
    this.draftData.portal = localStorage.getItem('portal') || '';
    this.draftData.type = localStorage.getItem('type') || '';
    this.selectedRadioValue = localStorage.getItem('radioValue') || null;
    this.selectedConnectPromotionsCheckbox =
      localStorage.getItem('selectedConnectPromotionCheckbox') === 'true';
    this.selectedBackPromotionCheckbox =
      localStorage.getItem('selectedBackPromotionCheckbox') === 'true';

    this.updateIsNameFilled();
    this.selectedPortalOption = this.draftData.portal;
    this.selectedTypeOption = this.draftData.type;

    const startDateString = localStorage.getItem('startDate');
    if (startDateString) {
      this.selectedStartDate = new Date(startDateString);
    }

    const finishDateString = localStorage.getItem('finishDate');
    if (finishDateString) {
      this.selectedFinishDate = new Date(finishDateString);
    }
  }

  updateIsNameFilled(): void {
    this.isNameFilled = !!(
      this.draftData.marketingName || this.draftData.technicalName
    );
  }

  canSelectItem(item: string): boolean {
    if (item === 'BONUS PRODUCTS' || item === 'PRODUCTS LIMITS') {
      return this.isNameFilled;
    }
    return true;
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  saveFormData(): void {
    this.loadDrafts();
    if (
      !this.draftData.marketingName ||
      !this.draftData.portal ||
      !this.draftData.type ||
      isNaN(this.selectedStartDate.getTime())
    ) {
      this.showSnackbar('All required fields must be completed.');
      return;
    }

    const formDataObject = {
      id: new Date().getTime(),
      marketingName: this.draftData.marketingName,
      technicalName: this.draftData.technicalName,
      description: this.draftData.description,
      portal: this.draftData.portal,
      type: this.draftData.type,
      startDate: this.selectedStartDate,
      finishDate: this.selectedFinishDate,
      radioValue: this.selectedRadioValue,
      selectedConnectPromotionsCheckbox: this.selectedConnectPromotionsCheckbox,
      selectedBackPromotionCheckbox: this.selectedBackPromotionCheckbox,
    };

    this.formDataService.addFormData(formDataObject);
    this.showSnackbar('The data has been saved.');
    localStorage.clear();
    this.router.navigate(['/promotions']);
  }
}
