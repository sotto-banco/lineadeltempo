import { EraObject } from 'main/store';
import { useEffect, useState } from 'react';
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

const Dummy = (props: Props) => {
  const [storedEras, setStoredEras] = useState<EraObject[] | null>([]);
  const [selectedEra, setSelectedEra] = useState<number>(0);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-eras', ['eras-page']);
    window.electron.ipcRenderer.on('got-eras', (eras: EraObject[]) => {
      console.log(eras);
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
  return <div className={props.className}></div>;
};

export const Eras = styled(Dummy)`
  width: 100%;
  height: 100%;
`;
