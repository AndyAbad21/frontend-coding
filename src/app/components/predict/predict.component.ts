import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-predict',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss']
})
export class PredictComponent {
  data: any = {
    "LOC_BLANK": 10,
    "BRANCH_COUNT": 2,
    "LOC_CODE_AND_COMMENT": 15,
    "LOC_COMMENTS": 8,
    "CYCLOMATIC_COMPLEXITY": 5,
    "DESIGN_COMPLEXITY": 3,
    "ESSENTIAL_COMPLEXITY": 2,
    "LOC_EXECUTABLE": 20,
    "HALSTEAD_CONTENT": 30,
    "HALSTEAD_DIFFICULTY": 5.6,
    "HALSTEAD_EFFORT": 1500,
    "HALSTEAD_ERROR_EST": 0.5,
    "HALSTEAD_LENGTH": 120,
    "HALSTEAD_LEVEL": 0.9,
    "HALSTEAD_PROG_TIME": 2.8,
    "HALSTEAD_VOLUME": 500,
    "NUM_OPERANDS": 50,
    "NUM_OPERATORS": 30,
    "NUM_UNIQUE_OPERANDS": 10,
    "NUM_UNIQUE_OPERATORS": 8,
    "LOC_TOTAL": 100
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService
  ) { }

  onSubmit() {
    this.http.post('http://127.0.0.1:8000/api/predict/', this.data)
      .subscribe((response: any) => {
        // Guardamos los datos en el servicio compartido
        this.sharedService.setPredictionData({
          prediction: response.prediction,
          image: response.image,
          explicaciones: response.explicaciones,
          explicacion_chatgpt: response.explicacion_chatgpt // Guardamos la explicación generada por ChatGPT
        });

        // Redirigir al componente de explicación
        this.router.navigate(['/explainp']);
      }, error => {
        console.error('Error en la solicitud:', error);
      });
  }

  get objectKeys() {
    return Object.keys(this.data);
  }
}
