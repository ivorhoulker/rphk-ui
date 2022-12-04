import { Button } from '../../Primitives/Button';
import { NotificationText } from '../../Primitives/NotificationText';
import { ReactNode } from 'react';
import { TextInput } from '../../Primitives/TextInput';
import clsx from 'clsx';
//TODO
interface Props {
  children?: ReactNode;
}

export const LoginForm = ({ children }: Props) => {
  return (
    <div className="relative flex h-full w-full flex-col">
      <TextInput id="email" />
      <TextInput id="password" />
      <Button variant="primary">Login</Button>
    </div>
  );
};
