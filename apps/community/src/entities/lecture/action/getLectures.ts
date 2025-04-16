"use server";

export const getLectures = async () => {
  // from youtube, get private video list
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID;

  if (!YOUTUBE_API_KEY || !PLAYLIST_ID) {
    console.error("YouTube API key and Playlist ID are required");
    return [];
  }

  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
};
