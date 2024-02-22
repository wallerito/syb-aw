import { Scrobble } from '../types';
import './ScrobbleCard.css';

interface ScrobbleCardProps {
  scrobble: Scrobble;
}

const ScrobbleCard: React.FC<ScrobbleCardProps> = ({ scrobble }) => {
  const { song_name, colors, artists, duration_ms, image_url, created_at } = scrobble;
  //Format date string to hh:mm:ss
  const getFormattedDate = (dateString: string) => new Date(dateString).toLocaleTimeString();
  const duration = new Date(duration_ms);
  const minutes = duration.getMinutes();
  const seconds = duration.getSeconds();
  return (
    <>
      <div className="scrobble-card">
        <img
          src={image_url}
          className="scrobble-card__image"
          style={{
            filter: `drop-shadow(-1rem -1rem 5rem ${colors.primary}) drop-shadow(1rem 1rem 5rem ${colors.accent})`,
          }}
        />
        <div className="scrobble-card__details">
          <div className="scrobble-card__info scrobble-card__info--primary">
            <div className="scrobble-card__info__title">{song_name}</div>
            <div className="scrobble-card__info__artists">{artists.map((artist) => artist.name).join(', ')}</div>
          </div>
          <div className="scrobble-card__info scrobble-card__info--secondary">
            <div className="scrobble-card__info__duration">{`Duration: ${minutes}:${seconds >= 10 ? seconds : '0' + seconds}`}</div>
            <div className="scrobble-card__info__played">{`Played: ${getFormattedDate(created_at)}`}</div>
            <div className="scrobble-card__info__duration">{`Channel: ${scrobble.play_from?.name || scrobble.channel_name || 'Unknown'}`}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export { ScrobbleCard };
