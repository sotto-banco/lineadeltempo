import styled from 'styled-components';
import { Props } from './types';

const Dummy = (props: Props) => {
  return (
    <div className={props.className}>
      <div className="label">{props.label}:</div>
      <textarea
        className="textarea"
        value={props.value}
        onChange={(e) => props.change(e.currentTarget.value)}
      />
    </div>
  );
};

export const Text = styled(Dummy)`
  .textarea {
    width: 500px;
    height: 100px;
    padding: 4px;
  }

  .label {
    font-weight: bold;
    margin-bottom: 5px;
  }
`;
