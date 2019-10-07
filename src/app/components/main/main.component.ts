import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { ExhibitsService } from '../../services/exhibits.service';
import { IExhibitResponse } from '../../models/exhibits';

const formatString = (str: string) => str.toString().toLowerCase().replace(/ /g, '');
const formatDate = (date: Date | number | string) => moment(date).format('DD.MM.YYYY hh:mm:ss');

interface IColumnProps {
  name: string;
  title: string;
  render?: (data: any) => {};
  cellClass?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  title = 'Catalog';
  isLoading = false;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'name',
    'gikNumber',
    'invNumber',
    'regNumber',
    'regDate',
    'technologies',
    'authors',
    'createDate'
  ];
  columnProps: IColumnProps[] = [
    {
      name: 'name',
      title: 'Название',
    },
    {
      name: 'gikNumber',
      title: 'Номер по ГИК (КП)',
    },
    {
      name: 'invNumber',
      title: 'Номер в Госкаталоге',
    },
    {
      name: 'regNumber',
      title: 'Регистрационный номер',
    },
    {
      name: 'regDate',
      title: 'Дата регистрации',
      cellClass: 'date',
      render: formatDate
    },
    {
      name: 'technologies',
      title: 'Материал, техника',
      render: (technologies: { name: string }[]) => technologies.reduce((acc, curr) => {
        acc.push(curr.name);

        return acc;
      }, []).join(', ')
    },
    {
      name: 'authors',
      title: 'Авторы',
      render: (authors: { name: string }[]) => authors.reduce((acc, curr) => {
        acc.push(curr.name);

        return acc;
      }, []).join(', ')
    },
    {
      name: 'createDate',
      title: 'Дата создания',
      cellClass: 'date',
      render: formatDate
    }
  ];

  constructor(private exhibitsService: ExhibitsService) {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.filter.bind(this);

    this.isLoading = true;
    const subscription = this.exhibitsService.get().subscribe(exhibits => {
      this.dataSource.data = exhibits;

      this.isLoading = false;
      subscription.unsubscribe();
    });
  }

  filter(data: IExhibitResponse, searchedString: string): boolean {
    const result = this.displayedColumns.reduce((acc: string, curr: string) => {
      let value = data[curr] || '';

      if (typeof value === 'number' && moment(value).isValid()) {
        value = formatDate(value);
      }

      if (Array.isArray(value)) {
        value = value.join('');
      }

      value = formatString(value);

      return acc += value;
    }, '');

    return !searchedString || result.indexOf(formatString(searchedString)) !== -1;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
