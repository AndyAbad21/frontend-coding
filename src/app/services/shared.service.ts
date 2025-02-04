import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private predictionData: any = null;

  setPredictionData(data: any) {
    this.predictionData = data;
  }

  getPredictionData() {
    return this.predictionData;
  }

  clearPredictionData() {
    this.predictionData = null;
  }
}
