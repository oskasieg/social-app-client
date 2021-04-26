import { ChangeEvent } from 'react';
import { IInterest } from '../../containers/Register/types';

export interface IInterestCheckboxProps {
  name: string;
  onChange: (e: ChangeEvent<any>) => void;
  value: string;
}
