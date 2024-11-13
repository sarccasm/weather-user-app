import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private weatherUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) { }

  getWeather(latitude: number, longitude: number): Observable<any> {
    const url = `${this.weatherUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m`;
    return this.http.get<any>(url);
  }

  getWeatherDescription(weatherCode: number): string {
    switch (weatherCode) {
      case 0: return 'Сонячно';
      case 1: return 'Переважно ясно';
      case 2: return 'Хмарно';
      case 3: return 'Похмуро';
      default: return 'Невідомий стан';
    }
  }

  getWeatherIcon(weatherCode: number): string {
    switch (weatherCode) {
      case 0: return '☀️'; 
      case 1: return '🌤️'; 
      case 2: return '☁️'; 
      case 3: return '🌧️'; 
      default: return '❓';
    }
  }

  getDailyWeather(latitude: number, longitude: number): Observable<any> {
    const url = `${this.weatherUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m`;
    return this.http.get<any>(url);
  }
}
