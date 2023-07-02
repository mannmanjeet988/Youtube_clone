const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyDizwX2rwNEQwp-xi6r3wgKuLe2K8HrcgU";

const container = document.getElementById("main-container");

async function getVideos(q) {
  const url = `${BASE_URL}/search?key=${API_KEY}&q=${q}&type=videos&maxResults=20`;
  const response = await fetch(url, {
    method: "get",
  });
  const data = await response.json();

  const videos = data.items;
  getVideoData(videos);
}

async function getVideoData(videos) {
  let videoData = [];
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    const videoId = video.id.videoId;
    videoData.push(await getVideoDetails(videoId));
  }

  console.log(videoData);
  renderVideos(videoData);
}

async function getVideoDetails(videoId) {
  const url = `${BASE_URL}/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`;
  const response = await fetch(url, {
    method: "get",
  });
  const data = await response.json();
  return data.items[0];
}

function renderVideos(videos) {
  container.innerHTML = ``;
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    const thumbnailUrl = video.snippet.thumbnails.high.url;
    container.innerHTML += `
    <div class="video-info" onclick="openVideoDetails('${video.id}')" >
        <div class="video-image">
          <img src="${thumbnailUrl}" alt="video title" />
        </div>
        <div class="video-description">
          <div class="channel-avatar">
            <img src="" alt="${video.snippet.channelTitle}" />
          </div>
          <div class="video-title">${video.snippet.localized.title}</div>
          <div class="channel-description">
            <p class="channel-name">Channel</p>
            <div class="inner-info">
              <p class="video-views">15K Views</p>
              <p class="video-time">1 week ago</p>
            </div>
          </div>
        </div>
      </div>
      `;
  }
}

function openVideoDetails(videoId) {
  localStorage.setItem("videoId", videoId);
  window.open("/videoDetails.html");
}

getVideos("");


// let searchString = "rahul gandhi";
// const container = document.getElementById("main-container");
// const apiKey = "AIzaSyDizwX2rwNEQwp-xi6r3wgKuLe2K8HrcgU" ;
// const endpoint =`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${searchString}&part=snippet&type=video&maxResults=20`;

// async function fetchResults(){
//     const response = await fetch(endpoint);
//     const result = await response.json();
//     renderVideos(result.items);
// }
// fetchResults()

// function renderVideos(videosList) {
//     videosList.forEach(video => {
//         const videoItem = document.createElement("div");
//         const {title, description, thumbnails} = video.snippet;
//         videoItem.innerHTML = `
//                     <p>${video.snippet.title}</p>
//                     <img src="${thumbnails.default.url}" width="200px" heigh="100px" />
//                     <p>${description}</p>
//                 `;

//         container.appendChild(videoItem);
//     })
// }

// Load video details
// const apiKey = "YOUR_API_KEY" ;
// const baseUrl = "https://www.googleapis.com/youtube/v3";
// const videoId = "3ARpsDCgwhM" ; 
// const endpoint = `${baseUrl}/videos?key=${apiKey}&part=snippet,statistics&id=${videoId}`;

// async function loadVideoDetails(){
//     const response = await fetch(endpoint);
//     const result = await response.json();
//     console.log(result)
// }
//loadVideoDetails();

// {
// "kind": "youtube#searchResult",
// "etag": "Nt0ucaNZbXFSqUNpJ6fuPibW8gs",
// "id": {
// "kind": "youtube#video",
// "videoId": "pzGNrhWBAS4"
// },
// "snippet": {
// "publishedAt": "2023-06-23T13:29:58Z",
// "channelId": "UCx8Z14PpntdaxCt2hakbQLQ",
// "title": "Rahul Gandhi की शादी और दाढ़ी पर Lalu Prasad yadav सरेआम क्या बोले सब हंस पड़े #shorts",
// "description": "",
// "thumbnails": {
//     "default": {
//         "url": "https://i.ytimg.com/vi/pzGNrhWBAS4/default.jpg",
//         "width": 120,
//         "height": 90
//     },
//     "medium": {
//         "url": "https://i.ytimg.com/vi/pzGNrhWBAS4/mqdefault.jpg",
//         "width": 320,
//         "height": 180
//     },
//     "high": {
//         "url": "https://i.ytimg.com/vi/pzGNrhWBAS4/hqdefault.jpg",
//         "width": 480,
//         "height": 360
//     }
// },
// "channelTitle": "The Lallantop",
// "liveBroadcastContent": "none",
// "publishTime": "2023-06-23T13:29:58Z"
// }
// } 