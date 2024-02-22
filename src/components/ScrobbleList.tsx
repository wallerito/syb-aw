import { Scrobble } from '../types';
import './ScrobbleList.css';

interface ScrobbleListProps {
  scrobbles: Scrobble[];
}
interface ScrobbleListRowProps {
  scrobble: Scrobble;
}

const ScrobbleListRow: React.FC<ScrobbleListRowProps> = ({ scrobble }) => {
  const { song_name, created_at, artists, image_url } = scrobble;

  //Format date string to hh:mm:ss
  const getFormattedDate = (dateString: string) => new Date(dateString).toLocaleTimeString();
  return (
    <>
      <img className="scrobble-list__image" src={image_url} />
      <div>{song_name}</div>
      <div className="scrobble-list__artists">{artists.map((artist) => artist.name).join(', ')}</div>
      <div className="scrobble-list__played">{getFormattedDate(created_at)}</div>
    </>
  );
};

const ScrobbleList: React.FC<ScrobbleListProps> = ({ scrobbles }) => {
  return (
    <>
      <div className="scrobble-list">
        <div className="scrobble-list__header"></div>
        <div className="scrobble-list__header">Title</div>
        <div className="scrobble-list__header scrobble-list__artists">Artist</div>
        <div className="scrobble-list__header scrobble-list__played">Played</div>
        {scrobbles.map((scrobble) => (
          <ScrobbleListRow key={scrobble.scrobble_id} scrobble={scrobble} />
        ))}
      </div>
    </>
  );
};

export { ScrobbleList };
