import { Component, ViewChild } from '@angular/core';
import { Observable, concat, combineLatest, merge, forkJoin } from 'rxjs';
import { VideoService } from '../video.service';
import { VideoList, Video } from '../types';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // get the HTML DOM element
  @ViewChild('search', {static:false}) search: IonSearchbar;

  videoList: Observable<VideoList>
  searchedList: Observable<VideoList>

  public searchedListTest: any;
  public searchText: any;

  public limit = 10; // default
  public page = 1; // default
  public isFirstLoading = true;
  public isLoading = true;

  // constructor function
  constructor(public videoService: VideoService) {
    setTimeout(() => {
      this.videoList = videoService.getAllVideos(this.limit, this.page);
      this.isLoading = false;
    }, 2000)
  }

  // set focus into search bar while using phones
  ionViewDidEnter() {
    setTimeout(() => {
      this.search.setFocus();
    }, 1500)
  }

  // searching videos from user input value in search bar
  _ionChange(event) {
    this.searchText = event.detail.value;
    this.videoList = this.searchedList;
    this.resetList();
    this.videoList = this.videoService.searchVideo(this.searchText, this.limit, this.page);

    // if search bar input is empty
    if(this.searchText && this.searchText.trim() == '' || this.searchText == '') {
      if(this.isFirstLoading) {
        this.resetList();
        this.videoList = this.videoService.getAllVideos(this.limit, this.page);
      } else {
        this.videoList = this.videoService.getAllVideos(this.limit, this.page);
      }
    }
  }

  // resetting searchbar text value from search bar
  _ionCancel(event) {
    this.search.value = "";
  }

  // load more item
  loadMoreVideos(event) {
    setTimeout(() => {
      if(!this.searchText) {
        this.incrementList();
        this.videoList = this.videoService.getAllVideos(this.limit, this.page);
      } else {
        this.incrementList();
        this.videoList = this.videoService.searchVideo(this.searchText, this.limit, this.page);
      }
      event.target.complete();
    }, 3000)
  }

  // incrementing page number and list limit 
  incrementList() {
    this.page++;
    this.limit+10;
    this.isFirstLoading = false;
    console.log("Displaying | page: " + this.page + ', limit: ' + this.limit + " First Load: " + this.isFirstLoading);
  }

  // resetting to default value 
  resetList() {
    this.limit = 10;
    this.page = 1;
    this.isFirstLoading = true;
    console.log("INFO: List has been reset to default! First Load: " + this.isFirstLoading );
  }

  // sync data to latest data, reset search bar too
  syncData() {
    this.resetList();
    this.videoList = this.videoService.getAllVideos(this.limit, this.page)
    this.search.value = "";
  }
}