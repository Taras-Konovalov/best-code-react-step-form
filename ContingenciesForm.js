import { useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormContext } from 'contexts/FormContext';
import styles from './ContingenciesForm.module.scss';
import FormSingleSelect from 'components/common/FormSingleSelect';
import FormTextInput from 'components/common/FormTextInput';
import { KeyboardDatePicker } from '@material-ui/pickers';

const options = [
  {
    id: 1,
    label: 'Yes',
  },
  {
    id: 2,
    label: 'No',
  },
];

const buyerOrSeller = [
  {
    id: 1,
    label: 'Buyer',
  },
  {
    id: 2,
    label: 'Seller',
  },
];

export const ContingenciesForm = ({ onSubmit, formRef }) => {
  const { formState } = useContext(FormContext);

  const validationSchema = Yup.object().shape({
    inspectionContingency: Yup.string().required('Required'),
    financingContingency:
      formState.financing.financingOption === 'Mortgage'
        ? Yup.string().required('Required')
        : Yup.string(),
    appraisalContingency: Yup.string().required('Required'),
    saleOfHomeContingency: Yup.string().required('Required'),
    contingentOnSaleOf: Yup.string().when('saleOfHomeContingency', {
      is: saleOfHomeContingency => {
        return saleOfHomeContingency === 'Yes';
      },
      then: Yup.string().required('Required'),
    }),
    closingDate: Yup.date().nullable().required('Required'),
    insurancePaidBy: Yup.string().required('Required'),
    hasHomeWarranty: Yup.string().required('Required'),
    homeWarrantyPaidBy: Yup.string().when('hasHomeWarranty', {
      is: hasHomeWarranty => {
        return hasHomeWarranty === 'Yes';
      },
      then: Yup.string().required('Required'),
    }),
    hasRefrigerator: Yup.string().required('Required'),
    hasWasherAndDryer: Yup.string().required('Required'),
    otherTerms: Yup.string(),
  });

  return (
    <div className={styles['container']}>
      <Formik
        innerRef={formRef}
        initialValues={formState.contingencies}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={values => {
          onSubmit({
            contingencies: {
              inspectionContingency: values.inspectionContingency,
              financingContingency: values.financingContingency,
              appraisalContingency: values.appraisalContingency,
              saleOfHomeContingency: values.saleOfHomeContingency,
              contingentOnSaleOf: values.contingentOnSaleOf,
              closingDate: values.closingDate,
              insurancePaidBy: values.insurancePaidBy,
              hasHomeWarranty: values.hasHomeWarranty,
              homeWarrantyPaidBy: values.homeWarrantyPaidBy,
              hasRefrigerator: values.hasRefrigerator,
              hasWasherAndDryer: values.hasWasherAndDryer,
              otherTerms: values.otherTerms,
            },
          });
        }}
      >
        {({ values, handleChange, handleSubmit, errors, setFieldValue }) => {
          return (
            <form onSubmit={handleSubmit}>
              <h3 className={styles['title']}>Contingencies</h3>
              <div className={styles['single-select']}>
                <FormSingleSelect
                  heading="Inspection Contingency?"
                  value={values.inspectionContingency}
                  name="inspectionContingency"
                  onChange={handleChange}
                  options={options}
                  hasError={Boolean(errors.inspectionContingency)}
                  isRow
                />
              </div>
              {formState.financing.financingOption === 'Mortgage' && (
                <div className={styles['single-select']}>
                  <FormSingleSelect
                    heading="Financing Contingency?"
                    value={values.financingContingency}
                    name="financingContingency"
                    onChange={handleChange}
                    options={options}
                    hasError={Boolean(errors.financingContingency)}
                    isRow
                  />
                </div>
              )}
              <div className={styles['single-select']}>
                <FormSingleSelect
                  heading="Appraisal Contingency?"
                  value={values.appraisalContingency}
                  name="appraisalContingency"
                  onChange={handleChange}
                  options={options}
                  hasError={Boolean(errors.appraisalContingency)}
                  isRow
                />
              </div>
              <div className={styles['single-select']}>
                <FormSingleSelect
                  heading="Sale of Home Contingency?"
                  value={values.saleOfHomeContingency}
                  name="saleOfHomeContingency"
                  onChange={handleChange}
                  options={options}
                  hasError={Boolean(errors.saleOfHomeContingency)}
                  isRow
                />
              </div>
              {values.saleOfHomeContingency === 'Yes' && (
                <div className={styles['text-field']}>
                  <FormTextInput
                    label="This purchase is contingent on the sale of:"
                    name="contingentOnSaleOf"
                    value={values.contingentOnSaleOf}
                    error={Boolean(errors.contingentOnSaleOf)}
                    onChange={handleChange}
                  />
                </div>
              )}
              <h3 className={styles['title']}>Closing Schedule</h3>
              <div className={styles['text-field']}>
                <KeyboardDatePicker
                  disableToolbar
                  TextFieldComponent={FormTextInput}
                  label="Proposed Closing Date"
                  name="closingDate"
                  value={values.closingDate}
                  error={Boolean(errors.closingDate)}
                  onChange={closingDate =>
                    setFieldValue('closingDate', closingDate)
                  }
                  format="MM/dd/yyyy"
                />
              </div>
              <h3 className={styles['title']}>Other Terms</h3>
              <div className={styles['single-select']}>
                <FormSingleSelect
                  heading="Who should pay title insurance?"
                  value={values.insurancePaidBy}
                  name="insurancePaidBy"
                  onChange={handleChange}
                  options={buyerOrSeller}
                  hasError={Boolean(errors.insurancePaidBy)}
                  isRow
                />
              </div>
              <div className={styles['single-select']}>
                <FormSingleSelect
                  heading="Would you like a home warranty?"
                  value={values.hasHomeWarranty}
                  name="hasHomeWarranty"
                  onChange={handleChange}
                  options={options}
                  hasError={Boolean(errors.hasHomeWarranty)}
                  isRow
                />
              </div>
              {values.hasHomeWarranty === 'Yes' && (
                <div className={styles['single-select']}>
                  <FormSingleSelect
                    heading="If yes, who should pay for the home warranty?"
                    value={values.homeWarrantyPaidBy}
                    name="homeWarrantyPaidBy"
                    onChange={handleChange}
                    options={buyerOrSeller}
                    hasError={Boolean(errors.homeWarrantyPaidBy)}
                    isRow
                  />
                </div>
              )}
              <div className={styles['single-select']}>
                <FormSingleSelect
                  heading="Would you like the seller to leave the refrigerator?"
                  value={values.hasRefrigerator}
                  name="hasRefrigerator"
                  onChange={handleChange}
                  options={options}
                  hasError={Boolean(errors.hasRefrigerator)}
                  isRow
                />
              </div>
              <div className={styles['single-select']}>
                <FormSingleSelect
                  heading="Would you like the seller to leave the washer and dryer?"
                  value={values.hasWasherAndDryer}
                  name="hasWasherAndDryer"
                  onChange={handleChange}
                  options={options}
                  hasError={Boolean(errors.hasWasherAndDryer)}
                  isRow
                />
              </div>
              <p className={styles['any-items']}>
                Would you like the seller to leave any other items?
              </p>
              <p className={styles['label']}>Other</p>
              <div className={styles['text-field']}>
                <FormTextInput
                  name="otherTerms"
                  value={values.otherTerms}
                  onChange={handleChange}
                  rows={4}
                  multiline
                />
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ContingenciesForm;
