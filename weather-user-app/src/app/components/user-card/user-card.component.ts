import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  user: any;
  weather: any;
  highTemp: number | null = null;
  lowTemp: number | null = null;

  constructor(private userService: UserService, private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(data => {
      this.user = data.results[0];
      this.loadWeather(this.user.location.coordinates.latitude, this.user.location.coordinates.longitude);
      this.loadDailyWeather(this.user.location.coordinates.latitude, this.user.location.coordinates.longitude);
    });
  }

  loadWeather(latitude: number, longitude: number): void {
    this.weatherService.getWeather(latitude, longitude).subscribe(data => {
      this.weather = data.current_weather;
    });
  }

  loadDailyWeather(latitude: number, longitude: number): void {
    this.weatherService.getDailyWeather(latitude, longitude).subscribe(data => {
      const temperatures = data.hourly.temperature_2m;
      this.highTemp = Math.max(...temperatures);
      this.lowTemp = Math.min(...temperatures);
    });
  }
}
