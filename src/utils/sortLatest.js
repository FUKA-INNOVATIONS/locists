/* const arr = [
  {
    "file_id": 22,
    "filename": "fa0a9fbf1ce740a28487203bdaf58d96.mp4",
    "filesize": 43266370,
    "title": "Landscape movie",
    "description": "this is a video",
    "user_id": 4,
    "media_type": "video",
    "mime_type": "video/mp4",
    "time_added": "2017-01-05T13:55:47.000Z",
    "thumbnails": {
      "w160": "547c35904b8b9e0571bcf1127d16a0bc-tn160.png",
      "w320": "547c35904b8b9e0571bcf1127d16a0bc-tn320.png",
      "w640": "547c35904b8b9e0571bcf1127d16a0bc-tn640.png"
    }
  },
  {
    "file_id": 22,
    "filename": "fa0a9fbf1ce740a28487203bdaf58d96.mp4",
    "filesize": 43266370,
    "title": "Landscape movie",
    "description": "this is a video",
    "user_id": 4,
    "media_type": "video",
    "mime_type": "video/mp4",
    "time_added": "2000-01-05T11:55:47.000Z",
    "screenshot": "547c35904b8b9e0571bcf1127d16a0bc.png",
    "thumbnails": {
      "w160": "547c35904b8b9e0571bcf1127d16a0bc-tn160.png",
      "w320": "547c35904b8b9e0571bcf1127d16a0bc-tn320.png",
      "w640": "547c35904b8b9e0571bcf1127d16a0bc-tn640.png"
    }
  },
  {
    "file_id": 22,
    "filename": "fa0a9fbf1ce740a28487203bdaf58d96.mp4",
    "filesize": 43266370,
    "title": "Landscape movie",
    "description": "this is a video",
    "user_id": 4,
    "media_type": "video",
    "mime_type": "video/mp4",
    "time_added": "2000-01-05T13:55:47.000Z",
    "screenshot": "547c35904b8b9e0571bcf1127d16a0bc.png",
    "thumbnails": {
      "w160": "547c35904b8b9e0571bcf1127d16a0bc-tn160.png",
      "w320": "547c35904b8b9e0571bcf1127d16a0bc-tn320.png",
      "w640": "547c35904b8b9e0571bcf1127d16a0bc-tn640.png"
    }
  },
  {
    "file_id": 23,
    "filename": "fa0a9fbf1ce740a28487203bdaf58d96.mp4",
    "filesize": 43266370,
    "title": "Landscape movie",
    "description": "this is a video",
    "user_id": 4,
    "media_type": "video",
    "mime_type": "video/mp4",
    "time_added": "2018-01-05T13:55:47.000Z",
    "screenshot": "547c35904b8b9e0571bcf1127d16a0bc.png",
    "thumbnails": {
      "w160": "547c35904b8b9e0571bcf1127d16a0bc-tn160.png",
      "w320": "547c35904b8b9e0571bcf1127d16a0bc-tn320.png",
      "w640": "547c35904b8b9e0571bcf1127d16a0bc-tn640.png"
    }
  },
  {
    "file_id": 2552,
    "filename": "fa0a9fbf1ce740a28487203bdaf58d96.mp4",
    "filesize": 43266370,
    "title": "Landscape movie",
    "description": "this is a video",
    "user_id": 4,
    "media_type": "video",
    "mime_type": "video/mp4",
    "time_added": "2020-01-05T13:55:47.000Z",
    "screenshot": "547c35904b8b9e0571bcf1127d16a0bc.png",
    "thumbnails": {
      "w160": "547c35904b8b9e0571bcf1127d16a0bc-tn160.png",
      "w320": "547c35904b8b9e0571bcf1127d16a0bc-tn320.png",
      "w640": "547c35904b8b9e0571bcf1127d16a0bc-tn640.png"
    }
  }
] */

const sortLatest = (arr) => {
  return arr.sort(function(a,b){
    return Number( new Date( b.time_added ) ) - Number( new Date( a.time_added ) );
  } )
}
export default sortLatest;