import styled from 'styled-components';
import { Props } from './types';

const Dummy = (props: Props) => {
  return (
    <div className={props.className} onClick={props.click}>
      {props.label}
    </div>
  );
};

export const Button = styled(Dummy)`
  border: 2px solid black;
  border-radius: 10px;
  padding: 10px;
  display: inline-block;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: orange;
    color: white;
  }
`;
