import { useState } from 'react';
import { Title } from 'renderer/components/title';
import styled from 'styled-components';
import { Props } from './types';

const Dummy = ({ className }: Props) => {
  const [selected, setSelected] = useState<'title' | 'events' | 'eras'>(
    'title'
  );

  return (
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
        {selected === 'events' && <div>eventi</div>}
        {selected === 'eras' && <div>epoche</div>}
      </div>
    </div>
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
`;
