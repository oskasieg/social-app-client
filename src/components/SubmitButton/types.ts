export interface ISubmitButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  text: string;
  onClick?: () => void;
}
