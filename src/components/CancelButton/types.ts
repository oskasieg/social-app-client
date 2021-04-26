export interface ICancelButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  text: string;
  onClick?: () => void;
}
