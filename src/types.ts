export interface Scrobble {
    scrobble_id?: string;
    track_id: string;
    song_name: string;
    artists: {
      name: string;
      uri: string;
    }[];
    image_url: string;
    colors: {
      primary: string;
      accent: string;
    };
    created_at: string;
    duration_ms: number;
    play_from?: {
        name: string;
    };
    channel_name?: string;
  }