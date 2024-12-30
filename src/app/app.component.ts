import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // User profile for two-way binding
  user = {
    name: '',
    email: '',
  };

  // Player search functionality
  players: any[] = [];
  searchQuery: string = '';
  apiKey: string = 'YOUR_RAPIDAPI_KEY'; // Replace with your actual RapidAPI key
  apiHost: string = 'api-football-v1.p.rapidapi.com'; // API host URL
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  // Search for a player by name
  searchPlayer(query: string) {
    if (!query.trim()) {
      this.errorMessage = 'Please enter a valid search query.';
      return;
    }

    this.errorMessage = '';
    const url = `https://${this.apiHost}/players`;

    const headers = new HttpHeaders()
      .set('X-RapidAPI-Key', this.apiKey)
      .set('X-RapidAPI-Host', this.apiHost);

    this.http
      .get(url, {
        headers,
        params: {
          search: query, // Search player by name
        },
      })
      .subscribe({
        next: (response: any) => {
          if (response && response.response && response.response.length > 0) {
            this.players = response.response;
          } else {
            this.errorMessage = 'No players found matching your search.';
            this.players = [];
          }
        },
        error: (error) => {
          console.error('Error fetching player data:', error);
          this.errorMessage = 'An error occurred while fetching player data.';
        },
      });
  }

  onSearch() {
    this.searchPlayer(this.searchQuery);
  }

  // Handle form submission
  onSubmit() {
    alert(`User profile updated: ${this.user.name} - ${this.user.email}`);
  }
}
