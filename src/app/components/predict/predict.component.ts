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
    "CYCLOMATIC_COMPLEXITY": 5,
    "BRANCH_COUNT": 2,
    "DESIGN_COMPLEXITY": 3,
    "LOC_BLANK": 10,
    "HALSTEAD_LENGTH": 50,
    "HALSTEAD_CONTENT": 30,
    "NUM_UNIQUE_OPERATORS": 8,
    "HALSTEAD_PROG_TIME": 2.5,
    "HALSTEAD_LEVEL": 0.9,
    "NUM_OPERATORS": 15
  };

  prediction: string | null = null;
  image: string | null = null; // Gráfico en Base64
  explicaciones: any[] = []; // Lista de explicaciones

  constructor(
    private http: HttpClient,
    private router: Router, // Para redirigir
    private sharedService: SharedService // Para compartir datos
  ) {}

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
