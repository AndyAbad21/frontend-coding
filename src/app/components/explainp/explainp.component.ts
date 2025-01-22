import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-explainp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explainp.component.html',
  styleUrl: './explainp.component.scss'
})
export class ExplainpComponent {
  prediction: string | null = null;
  image: string | null = null;
  explicaciones: any[] = [];

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    const data = this.sharedService.getPredictionData();
    if (data) {
      this.prediction = data.prediction;
      this.image = data.image;
      this.explicaciones = data.explicaciones;
      console.log(`Valor de prediction: "${this.prediction}"`);
    }
  }

  getPredictionClass(): string {
    if (this.prediction === 'Con Defectos') {
      return 'defectuoso';
    } else if (this.prediction === 'Sin Defectos') {
      return 'no-defectuoso';
    }
    return '';
  }
  
  
}
