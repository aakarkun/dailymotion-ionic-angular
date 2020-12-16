import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Video, VideoList } from './types';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor( private _httpClient: HttpClient ) { }

  getVideo(videoID: string): Observable<Video> {
    return this._httpClient.get<Video>(videoAPI + '/' + videoID);
  }

  getAllVideos(
    limit: number, 
    page: number): Observable<VideoList> {
    return this._httpClient.get<VideoList>(API + '?limit=' + limit + '&page=' + page);
  }

  searchVideo(
    searchText: string, 
    limit: number, 
    page: number): Observable<VideoList> {
    return this._httpClient.get<VideoList>(API + '?search=' + searchText + '&limit=' + limit + '&page=' + page);
  }

}

// const API = "https://api.dailymotion.com/videos"
const API = "https://api.dailymotion.com/videos";
const videoAPI = "https://api.dailymotion.com/video";

// const searchAPI = API + "?search={{searchText}}";

