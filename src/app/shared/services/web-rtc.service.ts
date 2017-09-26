import { Injectable } from '@angular/core';

@Injectable()
export class WebRtcService {

  constructor() {
  }

  showMyWebCam() {
    navigator.getUserMedia({ audio: false, video: true}, this.getUserMediaSuccess, this.getUserMediaError);
  }

  getUserMediaSuccess(stream: MediaStream): any {
    if (window.URL) {
      return window.URL.createObjectURL(stream);
    } else {
      return stream;
    }
  }

  getUserMediaError(error: MediaStreamError) {

  }
}
