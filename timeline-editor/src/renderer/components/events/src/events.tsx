import { EventObject, TitleObject } from 'main/store';
import { useEffect, useState } from 'react';
import { Button } from 'renderer/ui/button';
import { Input } from 'renderer/ui/input';
import { Text } from 'renderer/ui/text';
import styled from 'styled-components';
import { Props } from './types';

const EMPTY_EVENT = {
  autolink: true,
  media: {
    alt: '',
    thumbnail: '',
    url: '',
  },
  display_date: '',
  start_date: {
    year: 0,
    month: 1,
    day: 1,
  },
  end_date: {
    year: 0,
    month: 1,
    day: 1,
  },
  group: '',
  text: {
    headline: 'NUOVO',
    text: '',
  },
};

const Dummy = (props: Props) => {
  const [storedEvents, setStoredEvents] = useState<EventObject[] | null>();
  const [selectedItem, setSelectedItem] = useState<number>(0);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-events', ['events-page']);
    window.electron.ipcRenderer.on('got-events', (events: EventObject[]) => {
      setStoredEvents(events);
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
              <Input
                label="titolo"
                value={storedEvents[selectedItem].text.headline}
                change={(v) =>
                  setStoredEvents(
                    storedEvents.map((e, idx) => {
                      if (idx === selectedItem)
                        return { ...e, text: { ...e.text, headline: v } };
                      return e;
                    })
                  )
                }
              />
              <Text
                label="testo"
                value={storedEvents[selectedItem].text.text}
                change={(v) =>
                  setStoredEvents(
                    storedEvents.map((e, idx) => {
                      if (idx === selectedItem)
                        return { ...e, text: { ...e.text, text: v } };
                      return e;
                    })
                  )
                }
              />
              <Input
                label="gruppo"
                value={storedEvents[selectedItem].group!}
                change={(v) =>
                  setStoredEvents(
                    storedEvents.map((e, idx) => {
                      if (idx === selectedItem) return { ...e, group: v };
                      return e;
                    })
                  )
                }
              />
              <div className="row">
                <div className="label">data inizio</div>
                <div className="rowInputs">
                  <Input
                    date
                    label="anno"
                    value={storedEvents[
                      selectedItem
                    ].start_date.year.toString()}
                    change={(v) =>
                      setStoredEvents(
                        storedEvents.map((e, idx) => {
                          if (idx === selectedItem)
                            return {
                              ...e,
                              start_date: {
                                ...e.start_date,
                                year: parseInt(v),
                              },
                            };
                          return e;
                        })
                      )
                    }
                  />
                  <Input
                    date
                    label="mese"
                    value={storedEvents[
                      selectedItem
                    ].start_date.month!.toString()}
                    change={(v) =>
                      setStoredEvents(
                        storedEvents.map((e, idx) => {
                          if (idx === selectedItem)
                            return {
                              ...e,
                              start_date: {
                                ...e.start_date,
                                month: parseInt(v),
                              },
                            };
                          return e;
                        })
                      )
                    }
                  />
                  <Input
                    date
                    label="giorno"
                    value={storedEvents[
                      selectedItem
                    ].start_date.day!.toString()}
                    change={(v) =>
                      setStoredEvents(
                        storedEvents.map((e, idx) => {
                          if (idx === selectedItem)
                            return {
                              ...e,
                              start_date: {
                                ...e.start_date,
                                day: parseInt(v),
                              },
                            };
                          return e;
                        })
                      )
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="label">data fine</div>
                <div className="rowInputs">
                  <Input
                    date
                    label="anno"
                    value={storedEvents[
                      selectedItem
                    ].start_date.year.toString()}
                    change={(v) =>
                      setStoredEvents(
                        storedEvents.map((e, idx) => {
                          if (idx === selectedItem)
                            return {
                              ...e,
                              start_date: {
                                ...e.start_date,
                                year: parseInt(v),
                              },
                            };
                          return e;
                        })
                      )
                    }
                  />
                  <Input
                    date
                    label="mese"
                    value={storedEvents[
                      selectedItem
                    ].start_date.month!.toString()}
                    change={(v) =>
                      setStoredEvents(
                        storedEvents.map((e, idx) => {
                          if (idx === selectedItem)
                            return {
                              ...e,
                              start_date: {
                                ...e.start_date,
                                month: parseInt(v),
                              },
                            };
                          return e;
                        })
                      )
                    }
                  />
                  <Input
                    date
                    label="giorno"
                    value={storedEvents[
                      selectedItem
                    ].start_date.day!.toString()}
                    change={(v) =>
                      setStoredEvents(
                        storedEvents.map((e, idx) => {
                          if (idx === selectedItem)
                            return {
                              ...e,
                              start_date: {
                                ...e.start_date,
                                day: parseInt(v),
                              },
                            };
                          return e;
                        })
                      )
                    }
                  />
                </div>
              </div>
              <Input
                label="data custom"
                value={storedEvents[selectedItem].display_date}
                change={(v) =>
                  setStoredEvents(
                    storedEvents.map((e, idx) => {
                      if (idx === selectedItem)
                        return {
                          ...e,
                          display_date: v,
                        };
                      return e;
                    })
                  )
                }
              />
              <div className="row">
                <div className="label">coordinate</div>
                <div className="rowInputs">
                  <Input
                    label="titolo"
                    value={storedEvents[selectedItem].coords!.title}
                    change={(v) =>
                      setStoredEvents(
                        storedEvents.map((e, idx) => {
                          if (idx === selectedItem)
                            return {
                              ...e,
                              coords: { ...e.coords!, title: v },
                            };
                          return e;
                        })
                      )
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="rowInputs">
                  <Input
                    date
                    label="latitudine"
                    value={storedEvents[selectedItem].coords!.lat.toString()}
                    change={(v) =>
                      setStoredEvents(
                        storedEvents.map((e, idx) => {
                          if (idx === selectedItem)
                            return {
                              ...e,
                              coords: { ...e.coords!, lat: parseFloat(v) },
                            };
                          return e;
                        })
                      )
                    }
                  />
                  <Input
                    date
                    label="longitudine"
                    value={storedEvents[selectedItem].coords!.lon.toString()}
                    change={(v) =>
                      setStoredEvents(
                        storedEvents.map((e, idx) => {
                          if (idx === selectedItem)
                            return {
                              ...e,
                              coords: { ...e.coords!, lon: parseFloat(v) },
                            };
                          return e;
                        })
                      )
                    }
                  />
                </div>
              </div>
              <Input
                label="foto alt"
                value={storedEvents[selectedItem].media!.alt}
                change={(v) =>
                  setStoredEvents(
                    storedEvents.map((e, idx) => {
                      if (idx === selectedItem)
                        return {
                          ...e,
                          media: { ...e.media!, alt: v },
                        };
                      return e;
                    })
                  )
                }
              />
              <Input
                label="foto url"
                value={storedEvents[selectedItem].media!.url}
                change={(v) =>
                  setStoredEvents(
                    storedEvents.map((e, idx) => {
                      if (idx === selectedItem)
                        return {
                          ...e,
                          media: { ...e.media!, url: v },
                        };
                      return e;
                    })
                  )
                }
              />
              <Input
                label="thumbnail"
                value={storedEvents[selectedItem].media!.thumbnail}
                change={(v) =>
                  setStoredEvents(
                    storedEvents.map((e, idx) => {
                      if (idx === selectedItem)
                        return {
                          ...e,
                          media: { ...e.media!, thumbnail: v },
                        };
                      return e;
                    })
                  )
                }
              />
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
    text-align: center;
    overflow-y: scroll;
    padding: 30px 0;
  }

  .row {
    width: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .rowInputs {
    width: 70%;
    display: flex;
    flex-direction: row;
  }

  .label {
    font-weight: bold;
  }

  .footer {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
