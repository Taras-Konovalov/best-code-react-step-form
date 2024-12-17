import { useContext } from 'react';
import styles from './Review.module.scss';
import { FormContext } from 'contexts/FormContext';
import moment from 'moment';

export const Review = ({ listPrice, address }) => {
  const { formState } = useContext(FormContext);

  return (
    <div className={styles['container']}>
      <h3 className={styles['title']}>Review</h3>
      <div className={styles['review']}>
        <div className={styles['review-item']}>
          <span className={styles['label']}>Address:</span>
          <span className={styles['value']}>{address}</span>
        </div>
        <div className={styles['review-item']}>
          <span className={styles['label']}>List Price:</span>
          <span className={styles['value']}>
            {'$' +
              listPrice.toLocaleString('en-US', {
                useGrouping: true,
              })}
          </span>
        </div>
        <div className={styles['review-item']}>
          <span className={styles['label']}>Offer Price:</span>
          <span className={styles['value']}>
            {'$' +
              formState.financing.offerPrice?.toLocaleString('en-US', {
                useGrouping: true,
              })}
          </span>
        </div>
        {formState.financing.downpayment && (
          <div className={styles['review-item']}>
            <span className={styles['label']}>Downpayment:</span>
            <span className={styles['value']}>
              {'$' +
                formState.financing.downpayment?.toLocaleString('en-US', {
                  useGrouping: true,
                })}
            </span>
          </div>
        )}
        <div className={styles['review-item']}>
          <span className={styles['label']}>Earnest Money:</span>
          <span className={styles['value']}>
            {typeof formState.financing.earnestMoneyDeposit === 'string'
              ? formState.financing.earnestMoneyDeposit
              : '$' +
                formState.financing.earnestMoneyDeposit?.toLocaleString(
                  'en-US',
                  {
                    useGrouping: true,
                  }
                )}
          </span>
        </div>
        {formState.financing.loanType && (
          <div className={styles['review-item']}>
            <span className={styles['label']}>Payment Method:</span>
            <span className={styles['value']}>
              {formState.financing.loanType}
            </span>
          </div>
        )}
        <div className={styles['review-item']}>
          <span className={styles['label']}>Inspection Contingency:</span>
          <span className={styles['value']}>
            {formState.contingencies.inspectionContingency}
          </span>
        </div>
        {formState.contingencies.financingContingency && (
          <div className={styles['review-item']}>
            <span className={styles['label']}>Financing Contingency:</span>
            <span className={styles['value']}>
              {formState.contingencies.financingContingency}
            </span>
          </div>
        )}
        <div className={styles['review-item']}>
          <span className={styles['label']}>Appraisal Contingency:</span>
          <span className={styles['value']}>
            {formState.contingencies.appraisalContingency}
          </span>
        </div>
        <div className={styles['review-item']}>
          <span className={styles['label']}>Sale of Home Contingency:</span>
          <span className={styles['value']}>
            {formState.contingencies.saleOfHomeContingency}
          </span>
        </div>
        <div className={styles['review-item']}>
          <span className={styles['label']}>Title Insurance Paid By:</span>
          <span className={styles['value']}>
            {formState.contingencies.insurancePaidBy}
          </span>
        </div>
        <div className={styles['review-item']}>
          <span className={styles['label']}>Home Warranty:</span>
          <span className={styles['value']}>
            {formState.contingencies.hasHomeWarranty}
          </span>
        </div>
        <div className={styles['review-item']}>
          <span className={styles['label']}>Refrigerator Included:</span>
          <span className={styles['value']}>
            {formState.contingencies.hasRefrigerator}
          </span>
        </div>
        <div className={styles['review-item']}>
          <span className={styles['label']}>Washer and Dryer Included:</span>
          <span className={styles['value']}>
            {formState.contingencies.hasWasherAndDryer}
          </span>
        </div>
        {formState.contingencies.otherTerms && (
          <div className={styles['review-item']}>
            <span className={styles['label']}>Other Terms:</span>
            <span className={styles['value']}>
              {formState.contingencies.otherTerms}
            </span>
          </div>
        )}
        <div className={styles['review-item']}>
          <span className={styles['label']}>Closing Date:</span>
          <span className={styles['value']}>
            {moment(formState.contingencies.closingDate).format('MM/DD/YYYY')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Review;
