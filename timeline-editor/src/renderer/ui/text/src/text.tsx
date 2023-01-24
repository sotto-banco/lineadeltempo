import styled from 'styled-components';
import { Props } from './types';

const Dummy = (props: Props) => {
  return <textarea className={props.className}></textarea>;
};

export const Text = styled(Dummy)`
  width: 500px;
  height: 100px;
`;
