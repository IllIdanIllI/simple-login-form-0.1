"use client";
import { HiddenPassword, VisiblePassword } from '@/components/password/VisibilityIcons';
import styles from './page.module.css';
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from 'next/navigation';
import { Tooltip } from 'react-tooltip';
import { LoginFormErrors as Errors } from '@/service/auth/types';
import { validateLoginForm } from '@/service/auth/validation';

const MOCK_URL = 'https://api.example.com/login';

const prevFetch = window.fetch;
window.fetch = (url: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) => {
  if (url !== MOCK_URL) {
    return prevFetch(url, init)
  }

  // @ts-ignore
  const authorizationHeader = init?.headers?.['Authorization']
  if (authorizationHeader) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          json: () => Promise.resolve({
            token: '1234567890'
          }),
          ok: true,
          headers: new Headers(),
          redirected: false,
          statusText: 'OK',
          type: 'basic',
        } as any)
      }, 1_500)
    })
  }

  return prevFetch(url, init)
}

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: null }));
    }
    if (formError) setFormError('');
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: null }));
    }
    if (formError) {
      setFormError('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setIsLoading(true);
    setErrors({});

    const validationErrors = validateLoginForm(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      const firstErrorField = Object.keys(validationErrors)[0];
      const inputElement = document.getElementById(firstErrorField);
      if (inputElement) {
        inputElement.focus();
      }
      return;
    }

    const authorizationHeader = `Basic ${btoa(`${email}:${password}`)}`;
    const response = await fetch(MOCK_URL, {
      method: 'POST',
      headers: {
        'Authorization': authorizationHeader
      }
    })

    if (!response.ok) {
      setFormError('Invalid email or password');
      setIsLoading(false);
      return;
    }

    document.cookie = 'isLoggedIn=true; path=/';
    router.push('/');
    setIsLoading(false)
  };

  const emailErrorId = 'email-error';
  const passwordErrorId = 'password-error';
  const formErrorId = 'form-error';

  return (
    <section className={styles.authContainer}>
      <div className={styles.formColumn}>
        <div className={styles.formWrapper}>
          <h1 className={styles.formTitle}>Welcome Back!</h1>

          {formError && (
            <div className={styles.formErrorMessage} id={formErrorId} role="alert">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="you@example.com"
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? emailErrorId : undefined}
              />
              {errors.email && (
                <div className={styles.errorMessage} id={emailErrorId} role="alert">
                  {errors.email}
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                autoComplete="current-password webauthn"
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                required
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? passwordErrorId : undefined}
              />
              {errors.password && (
                <div className={styles.errorMessage} id={passwordErrorId} role="alert">
                  {errors.password}
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggleBtn}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword
                  ? <VisiblePassword className={styles.icon} />
                  : <HiddenPassword className={styles.icon} />}
              </button>
            </div>

            <div className={styles.forgotPassword}>
              <a
                data-tooltip-id="forgot-password-tooltip"
              >Forgot Password?</a>
              <Tooltip
                id="forgot-password-tooltip"
                events={['click']}
                place="top"
              >
                You can try any password and we make it work for you 😉
              </Tooltip>
            </div>


            <button type="submit" className={styles.loginButton} disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className={styles.spinner} aria-hidden="true"></span>
                  <span className={styles.srOnly}>Loading...</span>
                  Logging In...
                </>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          <div className={styles.switchAuth}>
            Don't have an account?{" "}
            <a data-tooltip-id="signup-tooltip">
              Sign up
            </a>
            <Tooltip
              id="signup-tooltip"
              events={['click']}
              place="top"
            >
              Signup it will be equals to login, you can proceed here
            </Tooltip>
          </div>
        </div>
      </div>
      <div className={styles.imageColumn}>
        {/* Background image applied via CSS */}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <LoginForm />
  );
}
