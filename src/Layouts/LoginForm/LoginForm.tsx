import { Form, Formik, FormikHelpers } from 'formik';

import { Button } from '../../Primitives/Button';
import { Loading } from '../../Primitives/Loading';
import { TextInput } from '../../Primitives/TextInput';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';

//TODO
interface Props {
  loginText?: string;
  onSubmit?: (
    data: { email: string; password: string },
    v: FormikHelpers<{
      email: string;
      password: string;
    }>,
  ) => Promise<void>;
  isSubmittingOverride?: boolean;
  testSubmitButton?: boolean;
}

const LoginSchema = z.object({
  email: z.string().min(1).email('Must be an email'),
  password: z.string().min(1, 'Password must be provided'),
});

type LoginType = z.infer<typeof LoginSchema>;

export const LoginForm = ({ loginText = 'Login', isSubmittingOverride, onSubmit, testSubmitButton = false }: Props) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, actions) => {
        onSubmit?.(values, actions);
        if (testSubmitButton) {
          setTimeout(() => {
            actions.setSubmitting(false);
            actions.resetForm();
          }, 2000);
        }
      }}
      validationSchema={toFormikValidationSchema(LoginSchema)}
    >
      {({ errors, values, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
        <form className="relative flex h-full w-full flex-col" onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            id="email"
            isSubmitting={isSubmitting}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.email}
            touched={touched.email}
            value={values.email}
          />
          <TextInput
            label="Password"
            id="password"
            isSubmitting={isSubmitting}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.password}
            touched={touched.password}
            value={values.password}
          />
          <Button
            variant="primary"
            type="submit"
            // disabled={!!(errors.email && touched.email) || !!(errors.password && touched.password)}
          >
            {(isSubmitting || isSubmittingOverride) && <Loading variant="primary" />}
            {loginText}
          </Button>
        </form>
      )}
    </Formik>
  );
};
