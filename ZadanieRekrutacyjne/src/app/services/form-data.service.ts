import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private formDataArraySubject: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);
  formDataArray$ = this.formDataArraySubject.asObservable();

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  loadFormDataArray() {
    this.http.get<any[]>(`${this.baseUrl}/promotions`).subscribe((data) => {
      this.formDataArraySubject.next(data);
    });
  }

  addFormData(formData: any): void {
    this.http
      .post<any>(`${this.baseUrl}/promotions`, formData)
      .subscribe((data) => {
        this.formDataArraySubject.next([
          ...this.formDataArraySubject.value,
          data,
        ]);
      });
  }

  removeFormData(id: number): void {
    const currentData = this.formDataArraySubject.value;

    this.http.delete(`${this.baseUrl}/promotions/${id}`).subscribe(() => {
      const newData = currentData.filter((item) => item.id !== id);
      this.formDataArraySubject.next(newData);
    });
  }

  updateFormData(id: number, updatedData: any): void {
    this.http
      .put<any>(`${this.baseUrl}/promotions/${id}`, updatedData)
      .subscribe((data) => {
        const updatedArray = this.formDataArraySubject.value.map((element) => {
          if (element.id === id) {
            return { ...element, ...data };
          }
          return element;
        });

        this.formDataArraySubject.next(updatedArray);
      });
  }
}
