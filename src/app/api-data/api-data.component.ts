import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Player {
  strPlayer: string;
  strThumb: string;
  strNationality: string;
  strTeam: string;
}

@Component({
  selector: 'app-api-data',
  templateUrl: './api-data.component.html',
  styleUrls: ['./api-data.component.css'],
})
export class ApiDataComponent implements OnInit {
  players: Player[] = [];
  searchQuery: string = '';
  apiKey: string = 'de0a143f24msh0761be349a513a9p1e9a67jsn124d0542edcd'; 
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
   
  }

  searchPlayer(query: string) {
    if (!query.trim()) {
      this.errorMessage = 'Please enter a valid search query.';
      return;
    }

    this.errorMessage = '';
    const url = `https://www.thesportsdb.com/api/v1/json/${this.apiKey}/searchplayers.php?p=${query}`;

    this.http.get(url).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);  // Log the API response to check its structure
        
        // Check if the player data exists in the response
        if (response.player && response.player.length > 0) {
          this.players = response.player;
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
