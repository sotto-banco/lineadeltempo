import styled from 'styled-components';
import { Props } from './types';

const Dummy = (props: Props) => {
  return (
    <div className={props.className}>
      <div className={!props.required ? 'label' : 'label required'}>
        {props.label}
      </div>
      <input
        className="input"
        value={props.value}
        onChange={(e) => props.change(e.currentTarget.value)}
        size={props.date ? 8 : 45}
      />
    </div>
  );
};

export const Input = styled(Dummy)`
  width: 100%;
  margin-bottom: 20px;

  .label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .required {
    color: #b60900;
  }

  .label::after {
    content: ':';
  }

  .input {
    padding: 4px;
  }
`;
