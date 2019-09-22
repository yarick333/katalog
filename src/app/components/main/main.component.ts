import { Component, OnInit } from '@angular/core';
import { ExhibitsService } from '../../services/exhibits.service';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  title = 'katalog';
  exhibits: any[] = [];

  constructor(private exhibitsService: ExhibitsService) {}

  ngOnInit(): void {
    this.exhibitsService.get().subscribe((exhibits: any[]) => {
      this.exhibits = exhibits;
    });
  }
}
