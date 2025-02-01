import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para ngModel
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-predict',
  standalone: true, // Asegúrate de que esto esté habilitado
  imports: [FormsModule, CommonModule], // Incluye FormsModule aquí
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss']
})
export class PredictComponent {
  data: any = {
    // CYCLOMATIC_COMPLEXITY: null,
    // BRANCH_COUNT: null,
    // DESIGN_COMPLEXITY: null,
    // LOC_BLANK: null,
    // HALSTEAD_LENGTH: null,
    // HALSTEAD_CONTENT: null,
    // NUM_UNIQUE_OPERATORS: null,
    // HALSTEAD_PROG_TIME: null,
    // HALSTEAD_LEVEL: null,
    // NUM_OPERATORS: null,
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

  prediction: string | null = null;
  image: string | null = null; // Gráfico en Base64
  explicaciones: any[] = []; // Lista de explicaciones

  constructor(
    private http: HttpClient,
    private router: Router, // Para redirigir
    private sharedService: SharedService // Para compartir datos
  ) { }

  onSubmit() {
    this.http.post('http://127.0.0.1:8000/api/predict/', this.data)
      .subscribe((response: any) => {
        this.sharedService.setPredictionData({
          prediction: response.prediction,
          image: response.image,
          explicaciones: response.explicaciones
        });

        // Redirigir al componente de explicación
        this.router.navigate(['/explainp']);
      }, error => {
        console.error('Error en la solicitud:', error);
      });
  }


  get objectKeys() {
    console.log(Object.keys(this.data)); // Esto debería imprimir las claves en la consola
    return Object.keys(this.data); // Retorna las claves del objeto data
  }

}
