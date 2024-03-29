import { useForm } from 'react-hook-form';
import Input from './Input';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';
import { SignInContext, ErrorsContext } from '@/lib/context';
import { useContext } from 'react';

const SignInForm = ({ handlePasswordReset }) => {
  const auth = getAuth();
  const { loginPage_i18n } = useContext(SignInContext);
  const {
    email_i18n,
    emailEG_i18n,
    password_i18n,
    reminder_i18n,
    signIn_i18n,
    signInSuccess_i18n
  } = loginPage_i18n;
  const { signInErrors_i18n } = useContext(ErrorsContext);

  const {
    register,
    handleSubmit,
    setError,
    getValues,

    formState: { isSubmitting, errors }
  } = useForm();

  const onSubmit = async (data) => {
    signInWithEmailAndPassword(auth, data.siemail, data.sipassword)
      .then(() => {
        toast.success(signInSuccess_i18n);
      })
      .catch((error) => {
        setError('sipassword', { type: error.code, message: error.message });
      });
  };

  return (
    <form className="grid gap-4 text-left" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label={email_i18n}
        errors={errors}
        placeholder={emailEG_i18n}
        {...register('siemail', {
          required: true,
          pattern: {
            value:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: signInErrors_i18n.validEmail_i18n
          }
        })}
      />
      <Input
        label={password_i18n}
        errors={errors}
        {...register('sipassword', {
          required: true,
          minLength: {
            value: 8,
            message: signInErrors_i18n.minLength_i18n
          },
          maxLength: {
            value: 40,
            message: signInErrors_i18n.maxLength_i18n
          }
        })}
        type="password"
        placeholder="••••••••••••"
      />

      <input
        className="btn btn-yellow my-4"
        disabled={isSubmitting}
        type="submit"
        value={signIn_i18n}
      />

      <a
        onClick={() => handlePasswordReset(getValues('siemail'))}
        className="link link-dark-bg justify-self-center p-2 underline"
      >
        {reminder_i18n}
      </a>
    </form>
  );
};

export default SignInForm;
