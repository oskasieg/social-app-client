import { ChangeEvent } from 'react';

export interface IInterestCheckboxProps {
  name: string;
  onChange: (e: ChangeEvent<any>) => void;
  value: string;
}
