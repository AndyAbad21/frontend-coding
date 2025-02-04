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
  explicacionChatGPT: string | null = null;
  historialPredicciones: any[] = [];
  idActual: number | null = null; // Para evitar duplicados en el historial

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.cargarHistorial();
    const data = this.sharedService.getPredictionData();
    if (data) {
      this.mostrarPrediccionActual(data);
    }
  }

  /**
   * Muestra la predicción actual y la almacena en el historial si no existe aún.
   */
  mostrarPrediccionActual(data: any) {
    this.prediction = data.prediction;
    this.image = data.image;
    this.explicaciones = data.explicaciones;
    this.explicacionChatGPT = data.explicacion_chatgpt;

    // Generar un identificador único para la predicción actual
    const nuevaPrediccion = {
      id: Date.now(), // ID basado en timestamp
      fecha: new Date().toLocaleString(),
      prediccion: data.prediction,
      imagen: data.image,
      explicaciones: data.explicaciones,
      explicacionChatGPT: data.explicacion_chatgpt
    };

    // Validar que no esté duplicada antes de agregarla
    this.guardarEnHistorial(nuevaPrediccion);
  }

  /**
   * Guarda la predicción en el historial solo si no existe previamente.
   */
  guardarEnHistorial(nuevaPrediccion: any) {
    let historial = JSON.parse(localStorage.getItem('historialPredicciones') || '[]');

    // Si la predicción actual ya está en el historial, no la agregamos nuevamente
    const existe = historial.some((item: any) => item.prediccion === nuevaPrediccion.prediccion && item.imagen === nuevaPrediccion.imagen);

    if (!existe) {
      historial.unshift(nuevaPrediccion);
      localStorage.setItem('historialPredicciones', JSON.stringify(historial));
    }

    this.historialPredicciones = historial;
    this.idActual = nuevaPrediccion.id; // Guardamos el ID actual para evitar reingreso
  }

  /**
   * Carga el historial de predicciones desde localStorage.
   */
  cargarHistorial() {
    this.historialPredicciones = JSON.parse(localStorage.getItem('historialPredicciones') || '[]');
  }

  /**
   * Carga una predicción del historial en la vista principal.
   */
  verPrediccion(id: number) {
    const prediccionSeleccionada = this.historialPredicciones.find(item => item.id === id);
    if (prediccionSeleccionada) {
      this.prediction = prediccionSeleccionada.prediccion;
      this.image = prediccionSeleccionada.imagen;
      this.explicaciones = prediccionSeleccionada.explicaciones;
      this.explicacionChatGPT = prediccionSeleccionada.explicacionChatGPT;
      this.idActual = id; // Actualizamos el ID de la predicción seleccionada
    }
  }

  /**
   * Elimina una predicción específica del historial y de localStorage.
   */
  eliminarPrediccion(id: number) {
    this.historialPredicciones = this.historialPredicciones.filter(item => item.id !== id);
    localStorage.setItem('historialPredicciones', JSON.stringify(this.historialPredicciones));

    // Si eliminamos la predicción actual, limpiamos la vista
    if (this.idActual === id) {
      this.prediction = null;
      this.image = null;
      this.explicaciones = [];
      this.explicacionChatGPT = null;
      this.idActual = null;
    }
  }

  /**
   * Devuelve la clase CSS para la predicción actual.
   */
  getPredictionClass(): string {
    return this.prediction === 'Con Defectos' ? 'defectuoso' : 'no-defectuoso';
  }
}
