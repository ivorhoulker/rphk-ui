import { Button } from '../../Primitives/Button';
import { TextInput } from '../../Primitives/TextInput';
//TODO
interface Props {
  loginText?: string;
}

export const LoginForm = ({ loginText = 'Login' }: Props) => {
  return (
    <div className="relative flex h-full w-full flex-col">
      <TextInput id="email" />
      <TextInput id="password" />
      <Button variant="primary">{loginText}</Button>
    </div>
  );
};
