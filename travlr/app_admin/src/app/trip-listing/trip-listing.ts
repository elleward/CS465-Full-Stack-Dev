import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCard } from '../trip-card/trip-card';

import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';


@Component({
  selector: 'app-trip-listing',
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  providers: [TripData]
})

export class TripListing implements OnInit {

  trips = signal<Trip[]>([]);
  message = signal<string>('');

  constructor(private tripDataService: TripData) {
    console.log('trip-listing constructor');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }

  private getStuff(): void {
    this.tripDataService.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips.set(value);
          if (value.length > 0) {
            this.message.set('There are ' + value.length + ' trips available.');
          } else {
            this.message.set('There were no trips retrieved from the database');
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }
}

