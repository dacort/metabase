import React, { useCallback, useMemo } from "react";
import { t } from "ttag";
import * as Yup from "yup";
import FormProvider from "metabase/core/components/FormProvider";
import Form from "metabase/core/components/Form";
import FormInput from "metabase/core/components/FormInput";
import FormSubmitButton from "metabase/core/components/FormSubmitButton";
import FormErrorMessage from "metabase/core/components/FormErrorMessage";
import { ForgotPasswordData } from "../../types";
import {
  PasswordFormFooter,
  PasswordFormLink,
  PasswordFormTitle,
} from "./ForgotPasswordForm.styled";

const ForgotPasswordSchema = Yup.object({
  email: Yup.string()
    .required(t`required`)
    .email(t`must be a valid email address`),
});

export interface ForgotPasswordFormProps {
  initialEmail?: string;
  onSubmit: (email: string) => void;
}

const ForgotPasswordForm = ({
  initialEmail = "",
  onSubmit,
}: ForgotPasswordFormProps): JSX.Element => {
  const initialValues = useMemo(
    () => ({ email: initialEmail }),
    [initialEmail],
  );

  const handleSubmit = useCallback(
    ({ email }: ForgotPasswordData) => onSubmit(email),
    [onSubmit],
  );

  return (
    <div>
      <PasswordFormTitle>{t`Forgot password`}</PasswordFormTitle>
      <FormProvider
        initialValues={initialValues}
        validationSchema={ForgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormInput
            name="email"
            title={t`Email address`}
            placeholder={t`The email you use for your Metabase account`}
            autoFocus
            fullWidth
          />
          <FormSubmitButton
            title={t`Send password reset email`}
            primary
            fullWidth
          />
          <FormErrorMessage />
        </Form>
      </FormProvider>
      <PasswordFormFooter>
        <PasswordFormLink to="/auth/login">{t`Back to sign in`}</PasswordFormLink>
      </PasswordFormFooter>
    </div>
  );
};

export default ForgotPasswordForm;
