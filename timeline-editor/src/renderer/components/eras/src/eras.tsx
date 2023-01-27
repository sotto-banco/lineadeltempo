import { EraObject } from 'main/store';
import { useEffect, useState } from 'react';
import { Button } from 'renderer/ui/button';
import { Input } from 'renderer/ui/input';
import styled from 'styled-components';
import { Props } from './types';

const EMPTY_ERA: EraObject = {
  text: {
    headline: 'NUOVA',
    text: '',
  },
  start_date: {
    year: 0,
  },
  end_date: {
    year: 0,
  },
};

const pruneEras = (toPrune: EraObject[]) => {
  const pruned = toPrune.map((e) => {
    let prunedE: EraObject = {
      text: { ...e.text },
      start_date: { year: e.start_date.year },
      end_date: { year: e.end_date.year },
    };

    if (e.start_date.month)
      prunedE.start_date = { ...prunedE.start_date, month: e.start_date.month };
    if (e.start_date.day)
      prunedE.start_date = { ...prunedE.start_date, day: e.start_date.day };
    if (e.end_date.month)
      prunedE.end_date = { ...prunedE.end_date, month: e.end_date.month };
    if (e.end_date.day)
      prunedE.end_date = { ...prunedE.end_date, day: e.end_date.day };

    return e;
  });
  return pruned.filter((e) => e.text.headline !== 'NUOVA');
};

const Dummy = (props: Props) => {
  const [storedEras, setStoredEras] = useState<EraObject[] | null>(null);
  const [selectedEra, setSelectedEra] = useState<number>(0);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-eras', ['eras-page']);
    window.electron.ipcRenderer.on('got-eras', (eras: EraObject[]) => {
      setStoredEras(
        eras
          .sort((a, b) => a.start_date.year - b.start_date.year)
          .concat(EMPTY_ERA)
      );
    });
    return () => {
      window.electron.ipcRenderer.removeListener('got-eras');
    };
  }, []);
  return (
    <div className={props.className}>
      {storedEras && (
        <div className="erasContainer">
          <div className="formContainer">
            <div className="erasList">
              {storedEras.map((e, idx) => {
                return (
                  <div
                    key={idx}
                    className={
                      selectedEra === idx
                        ? 'erasListItem selectedListItem'
                        : 'erasListItem'
                    }
                    onClick={() => {
                      setSelectedEra(idx);
                    }}
                  >
                    {' '}
                    <div className="smaller">
                      {e.start_date.year} - {e.end_date.year}
                    </div>
                    <br />
                    <div>{e.text.headline}</div>
                  </div>
                );
              })}
            </div>
            <div className="selectedEraEditor">
              {storedEras.length !== selectedEra + 1 && (
                <div
                  className="deleteButton"
                  onClick={() => {
                    const isToDelete = confirm("Vuoi eliminare l'era?");
                    if (isToDelete) {
                      window.electron.ipcRenderer.sendMessage('set-eras', [
                        pruneEras(storedEras).filter(
                          (_, i) => i !== selectedEra
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
                value={storedEras[selectedEra].text.headline}
                change={(v) => {
                  setStoredEras(
                    storedEras.map((e, idx) => {
                      if (idx === selectedEra)
                        return { ...e, text: { ...e.text, headline: v } };
                      return e;
                    })
                  );
                }}
              />
              <div className="row">
                <div className="label">data inizio</div>
                <div className="rowInputs">
                  <Input
                    required
                    date
                    label="anno"
                    value={storedEras[selectedEra].start_date.year.toString()}
                    change={(v) =>
                      setStoredEras(
                        storedEras.map((e, idx) => {
                          if (idx === selectedEra) {
                            return {
                              ...e,
                              start_date: {
                                ...e.start_date,
                                year: v !== '0' ? parseInt(v) : 0,
                              },
                            };
                          }
                          return e;
                        })
                      )
                    }
                  />
                  <Input
                    date
                    label="mese"
                    value={
                      storedEras[selectedEra].start_date.month
                        ? storedEras[selectedEra].start_date.month!.toString()
                        : ''
                    }
                    change={(v) =>
                      setStoredEras(
                        storedEras.map((e, idx) => {
                          if (idx === selectedEra)
                            return {
                              ...e,
                              start_date: {
                                ...e.start_date,
                                month: v !== '0' ? parseInt(v) : 0,
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
                      storedEras[selectedEra].start_date.day
                        ? storedEras[selectedEra].start_date.day!.toString()
                        : ''
                    }
                    change={(v) =>
                      setStoredEras(
                        storedEras.map((e, idx) => {
                          if (idx === selectedEra)
                            return {
                              ...e,
                              start_date: {
                                ...e.start_date,
                                day: v !== '0' ? parseInt(v) : 0,
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
                    required
                    date
                    label="anno"
                    value={storedEras[selectedEra].end_date.year.toString()}
                    change={(v) =>
                      setStoredEras(
                        storedEras.map((e, idx) => {
                          if (idx === selectedEra)
                            return {
                              ...e,
                              end_date: {
                                ...e.end_date,
                                year: v !== '0' ? parseInt(v) : 0,
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
                      storedEras[selectedEra].end_date.month
                        ? storedEras[selectedEra].end_date.month!.toString()
                        : ''
                    }
                    change={(v) =>
                      setStoredEras(
                        storedEras.map((e, idx) => {
                          if (idx === selectedEra)
                            return {
                              ...e,
                              end_date: {
                                ...e.end_date,
                                month: v !== '0' ? parseInt(v) : 0,
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
                      storedEras[selectedEra].end_date.day
                        ? storedEras[selectedEra].end_date.day!.toString()
                        : ''
                    }
                    change={(v) =>
                      setStoredEras(
                        storedEras.map((e, idx) => {
                          if (idx === selectedEra)
                            return {
                              ...e,
                              end_date: {
                                ...e.end_date,
                                day: v !== '0' ? parseInt(v) : 0,
                              },
                            };
                          return e;
                        })
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="footer">
            <Button
              label="salva"
              click={() =>
                window.electron.ipcRenderer.sendMessage('set-eras', [
                  pruneEras(storedEras),
                ])
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const Eras = styled(Dummy)`
  width: 100%;
  height: 100%;

  .erasContainer {
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

  .erasList {
    width: 30%;
    height: 100%;
    border-right: 1px solid black;
    display: flex;
    flex-direction: column;
    text-align: center;
    overflow-y: auto;
  }

  .selectedEraEditor {
    width: 70%;
    height: 100%;
    text-align: center;
    overflow-y: scroll;
    padding: 30px 0;
  }

  .footer {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .erasListItem {
    width: 100%;
    border-bottom: 1px solid black;
    text-align: center;
    cursor: default;
    user-select: none;
    padding: 6px;
  }

  .erasListItem:last-of-type {
    border-bottom: 0px;
  }

  .erasListItem:hover {
    background-color: #e0e0e0;
  }

  .selectedListItem {
    background-color: rgb(255, 165, 0);
  }

  .selectedListItem:hover {
    background-color: rgba(255, 165, 0, 0.5);
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
`;
