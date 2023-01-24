import { TitleObject } from 'main/store';
import { useEffect, useState } from 'react';
import { Button } from 'renderer/ui/button';
import { Input } from 'renderer/ui/input';
import { Text } from 'renderer/ui/text';
import styled from 'styled-components';
import { Props } from './types';

const Dummy = (props: Props) => {
  const [storedTitle, setStoredTitle] = useState<TitleObject | null>();

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-title', ['title-page']);
    window.electron.ipcRenderer.on('got-title', (title: TitleObject) => {
      setStoredTitle(title);
    });
    return () => {
      window.electron.ipcRenderer.removeListener('got-title');
    };
  }, []);
  return (
    <div className={props.className}>
      {storedTitle && (
        <div className="formContainer">
          <Input
            label="titolo"
            value={storedTitle.text.headline}
            change={(v) =>
              setStoredTitle({
                ...storedTitle,
                text: { ...storedTitle.text, headline: v },
              })
            }
          />
          <Text
            label="descrizione"
            value={storedTitle.text.text}
            change={(v) =>
              setStoredTitle({
                ...storedTitle,
                text: { ...storedTitle.text, text: v },
              })
            }
          />
          <Input
            label="immagine url"
            value={storedTitle.media.url}
            change={(v) =>
              setStoredTitle({
                ...storedTitle,
                media: { ...storedTitle.media, url: v },
              })
            }
          />
          <Input
            label="immagine alt"
            value={storedTitle.media.alt}
            change={(v) =>
              setStoredTitle({
                ...storedTitle,
                media: { ...storedTitle.media, alt: v },
              })
            }
          />
        </div>
      )}
      <div className="footer">
        <Button
          label="salva"
          click={() =>
            window.electron.ipcRenderer.sendMessage('set-title', [storedTitle])
          }
        />
      </div>
    </div>
  );
};

export const Title = styled(Dummy)`
  width: 100%;
  height: 100%;

  .formContainer {
    width: 100%;
    height: 92%;
    border-bottom: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow-y: scroll;
  }

  .footer {
    width: 100%;
    height: 8%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
