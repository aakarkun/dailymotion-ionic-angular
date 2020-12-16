import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Video } from '../types';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.page.html',
  styleUrls: ['./video-detail.page.scss'],
})
export class VideoDetailPage implements OnInit {

  videoDetail: Observable<Video>

  // constructor
  constructor(
    videoService: VideoService,
    activatedRoute: ActivatedRoute
    ) { 
      const videoID = activatedRoute.snapshot.params["videoID"];
      
      // angular service call to fetch video data
      // video data is an Observable type
      setTimeout(() => {
        this.videoDetail = videoService.getVideo(videoID);
      }, 3000);
    }

  ngOnInit() {
  }

}
