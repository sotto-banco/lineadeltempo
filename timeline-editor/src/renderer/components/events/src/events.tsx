import { EventObject } from 'main/store';
import { useEffect, useState } from 'react';
import { Button } from 'renderer/ui/button';
import { Input } from 'renderer/ui/input';
import { Text } from 'renderer/ui/text';
import styled from 'styled-components';
import { Props } from './types';

const EMPTY_EVENT: EventObject = {
  autolink: true,
  media: {
    alt: '',
    thumbnail: '',
    url: '',
  },
  display_date: '',
  start_date: {
    year: 0,
  },
  end_date: {
    year: 0,
  },
  group: '',
  text: {
    headline: 'NUOVO',
    text: '',
  },
  coords: {
    title: '',
    lon: 0,
    lat: 0,
  },
};

const pruneEvents = (toPrune: EventObject[]) => {
  return toPrune
    .filter((e) => e.text.headline !== 'NUOVO')
    .map((e) => {
      let pruned: any = {
        autolink: true,
        display_date: e.display_date,
        start_date: { year: e.start_date.year },
        text: { ...e.text },
      };
      if (e.coords && e.coords.title !== '')
        pruned = {
          ...pruned,
          coords: { title: e.coords.title },
        };
      if (e.coords?.lat)
        pruned = {
          ...pruned,
          coords: { ...pruned.coords, lat: e.coords.lat },
        };
      if (e.coords?.lon)
        pruned = {
          ...pruned,
          coords: { ...pruned.coords, lon: e.coords.lon },
        };

      if (e.start_date.month)
        pruned = {
          ...pruned,
          start_date: {
            ...pruned.start_date,
            month: e.start_date.month,
          },
        };

      if (e.start_date.day)
        pruned = {
          ...pruned,
          start_date: {
            ...pruned.start_date,
            day: e.start_date.day,
          },
        };

      if (e.end_date && e.end_date.year)
        pruned = {
          ...pruned,
          end_date: { year: e.end_date.year },
        };
      if (e.end_date?.month)
        pruned = {
          ...pruned,
          end_date: {
            ...pruned.end_date,
            month: e.end_date.month,
          },
        };
      if (e.end_date?.day)
        pruned = {
          ...pruned,
          end_date: { ...pruned.end_date, day: e.end_date.day },
        };

      if (e.group) pruned = { ...pruned, group: e.group };

      if (e.media && e.media.url !== '')
        pruned = { ...pruned, media: { ...e.media } };

      return pruned;
    });
};

const Dummy = (props: Props) => {
  const [storedEvents, setStoredEvents] = useState<EventObject[] | null>();
  const [selectedItem, setSelectedItem] = useState<number>(0);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-events', ['events-page']);
    window.electron.ipcRenderer.on('got-events', (events: EventObject[]) => {
      setStoredEvents(
        events
          .sort((a, b) => a.start_date.year - b.start_date.year)
          .concat(EMPTY_EVENT)
      );
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
                    onClick={() => {
                      setSelectedItem(idx);
                    }}
                  >
                    <div className="smaller">{e.display_date}</div>
                    <br />
                    <div>{e.text.headline}</div>
                  </div>
                );
              })}
            </div>
            <div className="selectedEventEditor">
              {storedEvents.length !== selectedItem + 1 && (
                <div
                  className="deleteButton"
                  onClick={() => {
                    const isToDelete = confirm("Vuoi eliminare l'evento?");
                    if (isToDelete) {
                      window.electron.ipcRenderer.sendMessage('set-events', [
                        pruneEvents(storedEvents).filter(
                          (_, i) => i !== selectedItem
                        ),
                      ]);
                    }
                  }}
                >
                  x
                </div>
              )}
              <Input
                required
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
                    required
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
                    value={
                      storedEvents[selectedItem].start_date.month
                        ? storedEvents[
                            selectedItem
                          ].start_date.month!.toString()
                        : ''
                    }
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
                    value={
                      storedEvents[selectedItem].start_date.day
                        ? storedEvents[selectedItem].start_date.day!.toString()
                        : ''
                    }
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
                    value={
                      storedEvents[selectedItem].end_date?.year
                        ? storedEvents[selectedItem].end_date!.year.toString()
                        : ''
                    }
                    change={(v) =>
                      setStoredEvents(
                        storedEvents.map((e, idx) => {
                          if (idx === selectedItem)
                            return {
                              ...e,
                              end_date: {
                                ...e.end_date,
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
                    value={
                      storedEvents[selectedItem].end_date?.month
                        ? storedEvents[selectedItem].end_date!.month!.toString()
                        : ''
                    }
                    change={(v) =>
                      setStoredEvents(
                        storedEvents.map((e, idx) => {
                          if (idx === selectedItem)
                            return {
                              ...e,
                              end_date: {
                                ...e.end_date!,
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
                    value={
                      storedEvents[selectedItem].end_date?.day
                        ? storedEvents[selectedItem].end_date!.day!.toString()
                        : ''
                    }
                    change={(v) =>
                      setStoredEvents(
                        storedEvents.map((e, idx) => {
                          if (idx === selectedItem)
                            return {
                              ...e,
                              end_date: {
                                ...e.end_date!,
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
                required
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
                  pruneEvents(storedEvents),
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

  .smaller {
    font-size: small;
    font-weight: bold;
  }

  .deleteButton {
    border: 1px solid black;
    border-radius: 10px;
    width: 30px;
    margin-left: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    user-select: none;
  }

  .deleteButton:hover {
    background-color: orange;
  }

  .footer {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
