import { useContext } from 'react';
import styles from './Financing.module.scss';
import { FormContext } from 'contexts/FormContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormTextInput from 'components/common/FormTextInput';
import NumberFormat from 'react-number-format';
import FormSingleSelect from 'components/common/FormSingleSelect';
import FormUploadFile from 'components/common/FormUploadFile';

const validationSchema = Yup.object().shape({
  offerPrice: Yup.string().required('Required'),
  earnestMoneyDeposit: Yup.string().required('Required'),
  financingOption: Yup.string(),
  loanType: Yup.string().when('financingOption', {
    is: financingOption => {
      return financingOption === 'Mortgage';
    },
    then: Yup.string().required('Required'),
  }),
  downpayment: Yup.string().when('financingOption', {
    is: financingOption => {
      return financingOption === 'Mortgage';
    },
    then: Yup.string().required('Required'),
  }),
  preApprovalLetter: Yup.mixed().when('financingOption', {
    is: financingOption => {
      return financingOption === 'Mortgage';
    },
    then: Yup.mixed().required('Required'),
  }),
  proofOfFunds: Yup.mixed().when('financingOption', {
    is: financingOption => {
      return financingOption === 'All Cash';
    },
    then: Yup.mixed().required('Required'),
  }),
});

const loanType = [
  {
    id: 1,
    label: 'Conventional Loan',
  },
  {
    id: 2,
    label: 'FHA Loan',
  },
  {
    id: 3,
    label: 'VA Loan',
  },
];

const Financing = ({ onSubmit, formRef }) => {
  const { formState } = useContext(FormContext);

  return (
    <div className={styles['container']}>
      <Formik
        innerRef={formRef}
        initialValues={formState.financing}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={values => {
          onSubmit({
            financing: {
              offerPrice: values.offerPrice,
              earnestMoneyDeposit: values.earnestMoneyDeposit,
              financingOption: values.financingOption,
              loanType: values.loanType,
              downpayment: values.downpayment,
              preApprovalLetter: values.preApprovalLetter,
              proofOfFunds: values.proofOfFunds,
            },
          });
        }}
      >
        {({ values, handleChange, handleSubmit, errors, setFieldValue }) => {
          return (
            <form onSubmit={handleSubmit}>
              <h3 className={styles['title']}>Have a price in mind?</h3>
              <div className={styles['price']}>
                <NumberFormat
                  customInput={FormTextInput}
                  prefix={'$'}
                  value={values.offerPrice}
                  onValueChange={({ floatValue }) => {
                    setFieldValue('offerPrice', floatValue);
                    const earnestMoneyDeposit = floatValue / 100;
                    setFieldValue('earnestMoneyDeposit', earnestMoneyDeposit);
                  }}
                  error={Boolean(errors.offerPrice)}
                  thousandSeparator={true}
                  label="Offer Price"
                  name="offerPrice"
                />
              </div>
              <div className={styles['price']}>
                <NumberFormat
                  customInput={FormTextInput}
                  prefix={'$'}
                  value={values.earnestMoneyDeposit}
                  thousandSeparator={true}
                  label="Earnest Money Deposit"
                  onChange={handleChange}
                  onValueChange={({ floatValue }) => {
                    setFieldValue('earnestMoneyDeposit', floatValue);
                  }}
                  name="earnestMoneyDeposit"
                  error={Boolean(errors.earnestMoneyDeposit)}
                  ishelper
                  helperText="Earnest money is typically 1% of the purchase price and is due 3 days after mutual acceptance."
                />
              </div>
              <h3 className={styles['title']}>
                {values.financingOption === 'Mortgage'
                  ? 'How will you be financing the purchase?'
                  : 'How will you be paying?'}
              </h3>
              <div className={styles['payment-method']}>
                <div className={styles['payment-option']}>
                  <input
                    type="radio"
                    id="Mortgage"
                    name="financingOption"
                    checked={values.financingOption === 'Mortgage'}
                    value="Mortgage"
                    onChange={() => {
                      setFieldValue('proofOfFunds', null);
                      setFieldValue('financingOption', 'Mortgage');
                    }}
                  />
                  <label htmlFor="Mortgage">Mortgage</label>
                </div>
                <div className={styles['payment-option']}>
                  <input
                    type="radio"
                    id="All Cash"
                    name="financingOption"
                    checked={values.financingOption === 'All Cash'}
                    value="All Cash"
                    onChange={() => {
                      setFieldValue('loanType', '');
                      setFieldValue('downpayment', '');
                      setFieldValue('preApprovalLetter', null);
                      setFieldValue('financingOption', 'All Cash');
                    }}
                  />
                  <label htmlFor="All Cash">All Cash</label>
                </div>
              </div>
              {values.financingOption === 'All Cash' && (
                <div className={styles['all-cash-file']}>
                  <FormUploadFile
                    label="Upload Proof of Funds"
                    value={values.proofOfFunds}
                    onDelete={() => setFieldValue('proofOfFunds', null)}
                    name="proofOfFunds"
                    onUpload={event => {
                      setFieldValue(
                        'proofOfFunds',
                        event.currentTarget.files[0]
                      );
                    }}
                    error={Boolean(errors.proofOfFunds)}
                  />
                </div>
              )}
              {values.financingOption === 'Mortgage' && (
                <div className={styles['mortgage-container']}>
                  <div className={styles['loan-select']}>
                    <FormSingleSelect
                      value={values.loanType}
                      name="loanType"
                      onChange={handleChange}
                      options={loanType}
                      hasError={Boolean(errors.loanType)}
                    />
                  </div>
                  <div className={styles['downpayment']}>
                    <NumberFormat
                      customInput={FormTextInput}
                      prefix={'$'}
                      value={values.downpayment}
                      thousandSeparator={true}
                      label="Downpayment"
                      onValueChange={({ floatValue }) => {
                        setFieldValue('downpayment', floatValue);
                      }}
                      name="downpayment"
                      error={Boolean(errors.downpayment)}
                    />
                  </div>
                  <div className={styles['file-container']}>
                    <FormUploadFile
                      label="Upload Pre-approval"
                      value={values.preApprovalLetter}
                      onDelete={() => setFieldValue('preApprovalLetter', null)}
                      name="preApprovalLetter"
                      onUpload={event => {
                        setFieldValue(
                          'preApprovalLetter',
                          event.currentTarget.files[0]
                        );
                      }}
                      error={Boolean(errors.preApprovalLetter)}
                    />
                  </div>
                </div>
              )}
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Financing;
