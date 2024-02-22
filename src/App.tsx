import { useState, useEffect } from 'react';
import { Scrobble } from './types';
import { ScrobbleCard } from './components/ScrobbleCard';
import { ScrobbleList } from './components/ScrobbleList';
import { CtaButton } from './components/CtaButton';
import './App.css';

interface ScrobbleApiInterface {
  new (zoneId: string): ScrobbleApiInstance;
}
interface ScrobbleApiInstance {
  fetchHistory(): Promise<Scrobble[]>;
  subscribe(onScrobble: (scrobble: Scrobble) => void): void;
  unsubscribe(): void;
  mockScrobble(): Scrobble;
}

declare global {
  interface Window {
    ScrobbleApi: ScrobbleApiInterface;
  }
}

// Zone id for "Soundtrack HQ - Lounge"
const DEFAULT_ZONE_ID = 'U291bmRab25lLCwxanBuY3lvajR6ay9Mb2NhdGlvbiwsMWp2bnk3aTdoMWMvQWNjb3VudCwsMW5kbWR6bmF5Z3cv';
const zoneId = DEFAULT_ZONE_ID.replace(/^[ #]+|\s+$/, '');

function App() {
  const [[scrobble, ...scrobbles], setScrobbles] = useState<Scrobble[]>([]);
  const [api, setApi] = useState<ScrobbleApiInstance>();

  useEffect(() => {
    // Add api script and create new instance when loaded
    const script = document.createElement('script');
    script.src = '../scrobble-api.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      setApi(new window.ScrobbleApi(zoneId));
    });

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch scrobbles and subscribe
  useEffect(() => {
    if (api) {
      api.unsubscribe();
      api.fetchHistory().then((scrobbles) => {
        setScrobbles(scrobbles.reverse());
        api.subscribe(addScrobble);
      });
    }
    return () => {
      api && api.unsubscribe();
    };
  }, [api]);

  // New mocked scrobble
  const mockScrobble = () => {
    if (api) {
      addScrobble(api.mockScrobble());
    }
  };

  const addScrobble = (scrobble: Scrobble): void => {
    const random = Math.floor(Math.random() * 900000) + 100000;
    setScrobbles((prev) => [{ ...scrobble, scrobble_id: scrobble.track_id + random }, ...prev]);
  };
  return (
    <>
      {scrobbles.length > 0 && (
        <div className="wrapper">
          <section className="section section--top">
            {scrobble && (
              <div className="section__header">
                {`Currently playing ${scrobble.play_from?.name || scrobble.channel_name || 'unknown channel'}`}
                <hr />
              </div>
            )}
            <div className="section__content">
              <ScrobbleCard scrobble={scrobble} />
            </div>
          </section>
          <section className="section--bottom">
            <div className="section__header">
              Recently played
              <hr />
            </div>
            <ScrobbleList scrobbles={scrobbles} />
          </section>
          <CtaButton onClick={mockScrobble} />
        </div>
      )}
    </>
  );
}

export default App;
