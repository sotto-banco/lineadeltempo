import { useEffect, useState } from 'react';
import { Eras } from 'renderer/components/eras';
import { Events } from 'renderer/components/events';
import { Title } from 'renderer/components/title';
import styled from 'styled-components';
import { Props } from './types';

const Dummy = ({ className }: Props) => {
  const [jsonLoaded, setJsonLoaded] = useState<boolean>(false);
  const [selected, setSelected] = useState<'title' | 'events' | 'eras'>(
    'title'
  );

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-data-json-path', ['hello']);
    window.electron.ipcRenderer.on('got-data-json-path', (loaded: boolean) => {
      setJsonLoaded(loaded);
    });
    return () => {
      window.electron.ipcRenderer.removeListener('got-data-json-path');
    };
  }, []);

  return (
    <>
      {jsonLoaded ? (
        <div className={className}>
          <div className="nav">
            <div
              className={selected === 'title' ? 'selected' : ''}
              onClick={() => setSelected('title')}
            >
              titolo
            </div>
            <div
              className={selected === 'events' ? 'selected' : ''}
              onClick={() => setSelected('events')}
            >
              eventi
            </div>
            <div
              className={selected === 'eras' ? 'selected' : ''}
              onClick={() => setSelected('eras')}
            >
              ere
            </div>
          </div>
          <div className="content">
            {selected === 'title' && <Title />}
            {selected === 'events' && <Events />}
            {selected === 'eras' && <Eras />}
          </div>
        </div>
      ) : (
        <div className={className}>
          <div className="loading">
            Apri un json valido (Ctrl+O) o prova a ricaricare la pagina
            (Ctrl+R).
          </div>
        </div>
      )}
    </>
  );
};

export const Home = styled(Dummy)`
  width: 100%;
  height: 100%;

  .nav {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 8%;
    border-bottom: 1px solid black;
    font-size: 1.5em;
  }

  .nav > div {
    cursor: pointer;
    user-select: none;
  }

  .nav > div:hover {
    color: #ff0000;
  }

  .nav > .selected {
    color: orange;
    font-weight: bold;
  }

  .content {
    width: 100%;
    height: 92%;
  }

  .loading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: larger;
  }
`;
