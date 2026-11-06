import { Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';

declare const Spotify: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  standalone: false
})
export class PlayerComponent implements OnInit, OnDestroy {
  @Input() trackUri!: string;
  player:any;
  deviceId:string = '';
  status:string = 'Connecting to Spotify...';
  paused:boolean = true;
  currentTrack:string = '';
  currentArtist:string = '';
  currentImage:string = '';
  position:number = 0;
  duration:number = 0;
  timer:any;

  constructor(private spotifyService:SpotifyService, private http:HttpClient, private zone:NgZone) { }

  ngOnInit() {
    (window as any).onSpotifyWebPlaybackSDKReady = () => this.initPlayer();
    if ((window as any).Spotify) {
      this.initPlayer();
    } else if (!document.getElementById('spotify-sdk')) {
      const script = document.createElement('script');
      script.id = 'spotify-sdk';
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      document.body.appendChild(script);
    }

    this.timer = setInterval(() => {
      if (!this.paused && this.duration > 0) {
        this.position = Math.min(this.position + 500, this.duration);
      }
    }, 500);
  }

  initPlayer() {
    this.player = new Spotify.Player({
      name: 'Spotify Browser Player',
      getOAuthToken: (cb:any) => {
        this.spotifyService.getToken().then((token) => cb(token));
      },
      volume: 0.5
    });

    this.player.addListener('ready', ({ device_id }:any) => {
      this.zone.run(() => { this.deviceId = device_id; this.status = 'Ready'; });
    });
    this.player.addListener('not_ready', () => {
      this.zone.run(() => { this.deviceId = ''; this.status = 'Player went offline'; });
    });
    this.player.addListener('player_state_changed', (state:any) => {
      if (!state) return;
      this.zone.run(() => {
        const track = state.track_window.current_track;
        this.paused = state.paused;
        this.currentTrack = track.name;
        this.currentArtist = track.artists.map((a:any) => a.name).join(', ');
        this.currentImage = track.album.images.length > 0 ? track.album.images[0].url : '';
        this.position = state.position;
        this.duration = state.duration;
      });
    });
    ['initialization_error', 'authentication_error', 'account_error', 'playback_error'].forEach((type) => {
      this.player.addListener(type, ({ message }:any) => {
        this.zone.run(() => { this.status = type + ': ' + message; });
      });
    });

    this.player.connect();
  }

  playTrack() {
    this.player.activateElement();
    this.spotifyService.getToken().then((token) => {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      });
      return firstValueFrom(this.http.put(
        'https://api.spotify.com/v1/me/player/play?device_id=' + this.deviceId,
        { uris: [this.trackUri] },
        { headers: headers }
      ));
    }).catch((err) => {
      this.status = 'Could not start playback';
      console.error(err);
    });
  }

  togglePlay() {
    this.player.togglePlay();
  }

  formatTime(ms:number):string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  ngOnDestroy() {
    clearInterval(this.timer);

    if (this.player) {
      this.player.disconnect();
    }
  }
}