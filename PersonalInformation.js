import { useContext } from 'react';
import styles from './PersonalInformation.module.scss';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormTextInput from 'components/common/FormTextInput';
import FormPhoneInput from 'components/common/FormPhoneInput';
import { FormContext } from 'contexts/FormContext';
import { formatPhoneNumber } from 'react-phone-number-input';

const validationSchema = Yup.object().shape({
  fullLegalName: Yup.string().required('Required'),
  email: Yup.string().email().required('Required'),
  phoneNumber: Yup.string().required('Required'),
  coBuyerFullLegalName: Yup.string(),
  isCoBuyer: Yup.boolean(),
  coBuyerFullLegalName: Yup.string().when('isCoBuyer', {
    is: isCoBuyer => {
      return isCoBuyer;
    },
    then: Yup.string().required('Required'),
  }),
  coBuyerEmail: Yup.string().when('isCoBuyer', {
    is: isCoBuyer => {
      return isCoBuyer;
    },
    then: Yup.string().required('Required'),
  }),
  coBuyerPhoneNumber: Yup.string().when('isCoBuyer', {
    is: isCoBuyer => {
      return isCoBuyer;
    },
    then: Yup.string().required('Required'),
  }),
});

const PersonalInformation = ({ onSubmit, formRef }) => {
  const { formState } = useContext(FormContext);

  return (
    <div className={styles['container']}>
      <h3 className={styles['title']}>Personal Information</h3>
      <Formik
        innerRef={formRef}
        initialValues={formState.personalInformation}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={values => {
          onSubmit({
            personalInformation: {
              fullLegalName: values.fullLegalName,
              email: values.email,
              phoneNumber: formatPhoneNumber(values.phoneNumber),
              coBuyerFullLegalName: values.coBuyerFullLegalName,
              coBuyerEmail: values.coBuyerEmail,
              coBuyerPhoneNumber: formatPhoneNumber(values.coBuyerPhoneNumber),
              isCoBuyer: values.isCoBuyer,
            },
          });
        }}
      >
        {({ values, handleChange, setFieldValue, handleSubmit, errors }) => {
          return (
            <form noValidate onSubmit={handleSubmit}>
              <div className={styles['full-legal-name']}>
                <FormTextInput
                  label="Full Legal Name"
                  name="fullLegalName"
                  value={values.fullLegalName}
                  error={Boolean(errors.fullLegalName)}
                  onChange={handleChange}
                  ishelper
                  helperText="Please type your full legal name as you would like it to appear on the deed."
                />
              </div>
              <div className={styles['email-phoneNumber-container']}>
                <div className={styles['email']}>
                  <FormTextInput
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                  />
                </div>
                <div className={styles['phoneNumber']}>
                  <FormPhoneInput
                    label="Phone Number"
                    name="phoneNumber"
                    value={values?.phoneNumber}
                    onChange={phoneNumber => {
                      setFieldValue(`phoneNumber`, phoneNumber);
                    }}
                    error={Boolean(errors.phoneNumber)}
                  />
                </div>
              </div>
              {values.isCoBuyer && (
                <div className={styles['co-buyer-container']}>
                  <div className={styles['full-legal-name']}>
                    <FormTextInput
                      label="Co-Buyer Full Legal Name"
                      name="coBuyerFullLegalName"
                      value={values.coBuyerFullLegalName}
                      onChange={handleChange}
                      ishelper
                      helperText="Please type the full legal name of your Co-Buyer as you would like it to appear on the deed."
                      error={Boolean(errors.coBuyerFullLegalName)}
                    />
                  </div>
                  <div className={styles['email-phoneNumber-container']}>
                    <div className={styles['email']}>
                      <FormTextInput
                        label="Co-Buyer Email"
                        name="coBuyerEmail"
                        value={values.coBuyerEmail}
                        onChange={handleChange}
                        error={Boolean(errors.coBuyerEmail)}
                      />
                    </div>
                    <div className={styles['phoneNumber']}>
                      <FormPhoneInput
                        label="Co-Buyer Phone Number"
                        name="coBuyerPhoneNumber"
                        value={values?.coBuyerPhoneNumber}
                        onChange={coBuyerPhoneNumber => {
                          setFieldValue(
                            `coBuyerPhoneNumber`,
                            coBuyerPhoneNumber
                          );
                        }}
                        error={Boolean(errors.coBuyerPhoneNumber)}
                      />
                    </div>
                  </div>
                </div>
              )}
              <button
                className={styles['add-co-buyer']}
                type="button"
                onClick={() => setFieldValue('isCoBuyer', !values.isCoBuyer)}
              >
                <img
                  src={
                    !values.isCoBuyer
                      ? '/icons/add-co-buyer-icon.svg'
                      : '/icons/remove-co-buyer-icon.svg'
                  }
                  className={styles['icon']}
                  alt="icon"
                />
                {!values.isCoBuyer ? 'Add Co-buyer' : 'Remove Co-buyer '}
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PersonalInformation;
