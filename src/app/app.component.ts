import { Component, ElementRef, ViewChild } from '@angular/core';
import { ColumnApi, GridApi } from 'ag-grid-community';
import * as csvJSON from 'csvtojson';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('filterTextBox') filterTextBox: ElementRef | undefined;
  gridOptions = {
    columnDefs: [
      { field: 'make', headerName: 'Camper Brand', sortable: true },
      { field: 'brand', headerName: 'Camper Make', sortable: true },
      { field: 'sleep_number', headerName: 'Sleep Number', sortable: true },
      { field: 'price', headerName: 'Price', sortable: true },
    ],
    rowData: [],
  };
  api: GridApi = {} as GridApi;
  columnApi: ColumnApi = {} as ColumnApi;

  onGridReady(params: any) {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  onFilterTextBoxChanged() {
    const textValue = this.filterTextBox
      ? this.filterTextBox.nativeElement.value
      : '';
    this.api.setQuickFilter(textValue);
  }

  convertFile(event: any) {
    const input = document.getElementById('fileInput') as any;

    const reader = new FileReader();
    reader.onload = async () => {
      let text = reader.result as string;

      var json = await csvJSON({
        headers: ['make', 'brand', 'sleep_number', 'price'],
      }).fromString(text);
      this.api.setRowData(json);
    };
    reader.readAsText(input.files[0]);
  }
}
