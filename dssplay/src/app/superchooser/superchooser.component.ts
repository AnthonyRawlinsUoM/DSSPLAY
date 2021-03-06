import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-superchooser',
    templateUrl: './superchooser.component.html',
    styleUrls: ['./superchooser.component.css']
})
export class SuperchooserComponent implements OnInit {
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    data = [];
    displayColumns: string[] = ['Weather', 'Fuel'];

    constructor() { }

    ngOnInit() {
        this.data = this.getData();
        this.dataSource.data = this.data;
        this.dataSource.paginator = this.paginator;
    }

    private getData(): any {
        return [
            {Weather: "NARCLiM Current", Fuel: "NARCliM Future"},
            {Weather: "NARCLiM Current", Fuel: "NARCliM Current"},
            {Weather: "NARCLiM Current", Fuel: "INVEXP"},

            {Weather: "NARCLiM Future", Fuel: "NARCliM Future"},
            {Weather: "NARCLiM Future", Fuel: "NARCliM Current"},
            {Weather: "NARCLiM Future", Fuel: "INVEXP"},

            {Weather: "INVEXP", Fuel: "NARCliM Future"},
            {Weather: "INVEXP", Fuel: "NARCliM Current"},
            {Weather: "INVEXP", Fuel: "INVEXP"}
        ]
    }

    sortData($event) {
        const sortId = $event.active;
        const sortDirection = $event.direction;
        if ('asc' == sortDirection) {
            this.dataSource.data = this.data.slice().sort(
                (a, b) => a[sortId] > b[sortId] ? -1 : a[sortId] < b[sortId] ? 1 : 0
            );
        } else {
            this.dataSource.data = this.data.slice().sort(
                (a, b) => a[sortId] < b[sortId] ? -1 : a[sortId] > b[sortId] ? 1 : 0
            );
        }
    }

    openFilter(col: string) {
        document.getElementById(col + '-filter').removeAttribute('hidden');
    }

    closeFilter(col: string) {
        document.getElementById(col + '-filter').setAttribute('hidden', 'true');
    }

    filterData(col: string, filtertext: string) {
        if (filtertext.trim() != '') {
            this.dataSource.data = this.data.slice().filter(
                (element) => JSON.stringify(element[col]).indexOf(filtertext) > -1
            );
        }
    }

    reorderColumns($event) {
        const fromIndex: number = this.displayColumns.indexOf($event.previousContainer.id);
        const toIndex: number = this.displayColumns.indexOf($event.container.id);
        moveItemInArray(this.displayColumns, fromIndex, toIndex);
    }

}
