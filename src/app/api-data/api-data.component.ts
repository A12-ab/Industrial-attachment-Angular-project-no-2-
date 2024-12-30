import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Player {
  player_name: string;
  strThumb: string;  // Corrected property for player image from the API
  nationality: string;
  team_name: string;
}

@Component({
  selector: 'app-api-data',
  templateUrl: './api-data.component.html',
  styleUrls: ['./api-data.component.css'],
})
export class ApiDataComponent implements OnInit {
  players: Player[] = [];
  searchQuery: string = '';
  apiKey: string = 'YOUR_RAPIDAPI_KEY'; // Replace with your actual RapidAPI key
  apiHost: string = 'api-football-v1.p.rapidapi.com'; // API host URL
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

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
          console.log('API Response:', response); // Log the response for debugging

          // Check if the player data exists in the response
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
}
