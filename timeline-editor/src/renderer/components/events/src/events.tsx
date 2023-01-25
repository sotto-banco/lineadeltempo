import { EventObject, TitleObject } from 'main/store';
import { useEffect, useState } from 'react';
import { Button } from 'renderer/ui/button';
import { Input } from 'renderer/ui/input';
import { Text } from 'renderer/ui/text';
import styled from 'styled-components';
import { Props } from './types';

const Dummy = (props: Props) => {
  const [storedEvents, setStoredEvents] = useState<EventObject[] | null>();
  const [selectedItem, setSelectedItem] = useState<number>(0);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-events', ['events-page']);
    window.electron.ipcRenderer.on('got-events', (events: EventObject[]) => {
      setStoredEvents(events);
      console.log(events);
    });
    return () => {
      window.electron.ipcRenderer.removeListener('got-events');
    };
  }, []);
  return (
    <div className={props.className}>
      {storedEvents && (
        <div className="eventsContainer">
          <div className="formContainer">
            <div className="eventsList">
              {storedEvents.map((e, idx) => {
                return (
                  <div
                    key={idx}
                    className={
                      selectedItem === idx
                        ? 'eventsListItem selectedListItem'
                        : 'eventsListItem'
                    }
                    onClick={() => setSelectedItem(idx)}
                  >
                    {e.display_date}
                    <br />
                    {e.text.headline}
                  </div>
                );
              })}
            </div>
            <div className="selectedEventEditor">
              {
                storedEvents.filter((e, idx) => idx === selectedItem)[0].text
                  .headline
              }
            </div>
          </div>
          <div className="footer">
            <Button
              label="salva"
              click={() =>
                window.electron.ipcRenderer.sendMessage('set-events', [
                  storedEvents,
                ])
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const Events = styled(Dummy)`
  width: 100%;
  height: 100%;

  .eventsContainer {
    width: 100%;
    height: 100%;
  }

  .formContainer {
    width: 100%;
    height: 90%;
    border-bottom: 1px solid black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .eventsList {
    width: 30%;
    height: 100%;
    border-right: 1px solid black;
    display: flex;
    flex-direction: column;
    text-align: center;
    overflow-y: auto;
  }

  .eventsListItem {
    width: 100%;
    border-bottom: 1px solid black;
    text-align: center;
    cursor: default;
    user-select: none;
    padding: 6px;
  }

  .eventsListItem:last-of-type {
    border-bottom: 0px;
  }

  .eventsListItem:hover {
    background-color: #e0e0e0;
  }

  .selectedListItem {
    background-color: rgb(255, 165, 0);
  }

  .selectedListItem:hover {
    background-color: rgba(255, 165, 0, 0.5);
  }

  .selectedEventEditor {
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow-y: scroll;
  }

  .footer {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
