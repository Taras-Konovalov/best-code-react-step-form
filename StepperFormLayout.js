import {
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
} from '@material-ui/core';
import Listing from 'components/HomesForSale/Listings/Listing';
import styles from './StepperFormLayout.module.scss';
import DefaultButton from 'components/common/DefaultButton';

const useStyles = makeStyles(theme => ({
  stepper: {
    alignSelf: 'center',
    padding: 0,
    maxWidth: 676,
    width: '100%',
    padding: '0 60px',
    marginBottom: 32,

    '& .MuiStepIcon-text': {
      fill: '#ffffff',
    },

    '& .MuiStepLabel-label': {
      marginTop: 4,
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '22px',
      color: '#233759',

      [theme.breakpoints.down(480)]: {
        fontSize: 12,
      },
    },

    '& .MuiStepIcon-root': {
      boxSizing: 'border-box',
      border: '1px solid #5577F2',
      borderRadius: '50%',
      color: '#ffffff',
      width: 24,
      height: 24,

      '& .MuiStepIcon-text': {
        fill: '#5577F2',
      },
    },

    '& .MuiStepIcon-active': {
      color: '#5577F2',
      border: 'none',
      boxSizing: 'border-box',

      '& .MuiStepIcon-text': {
        fill: '#ffffff !important',
      },
    },

    '& .MuiStepIcon-completed': {
      color: '#5577F2',
      border: 'none',
    },
  },
}));

const StepperFormLayout = ({
  children,
  steps,
  activeStep,
  handleNext,
  handleBack,
  handleSubmit,
  listing,
}) => {
  const isMobile = useMediaQuery('(max-width:810px)');

  const { stepper } = useStyles();

  return (
    <div className={styles['form-layout']}>
      <div className={styles['stepper-layout']}>
        <Stepper activeStep={activeStep} alternativeLabel className={stepper}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <button className={styles['back-button']} onClick={handleBack}>
          <img
            src="/icons/home-for-sale/arrow-left-blue.svg"
            width="14"
            height="14"
            alt="arrow"
          />
          Back
        </button>
        <div className={styles['step-form']}>{children}</div>

        {activeStep >= steps.length - 1 ? (
          <DefaultButton
            onClick={() => {
              handleSubmit();
              window.scrollTo(0, 0);
            }}
            label={'Submit'}
            variant="primary"
            style={{
              fontWeight: 500,
              minWidth: isMobile ? '100%' : '200px',
              marginBottom: '32px',
            }}
            mobile
          />
        ) : (
          <DefaultButton
            onClick={() => {
              handleNext();
              window.scrollTo(0, 0);
            }}
            label={`Next: ${steps[activeStep + 1]}`}
            variant="primary"
            style={{
              fontWeight: 500,
              minWidth: isMobile ? '100%' : '200px',
              marginBottom: '32px',
            }}
            mobile
          />
        )}

        {activeStep === 3 && (
          <p className={styles['note']}>
            <span>Note:</span> This is a non-binding indication of interest.
            When you submit for review, your felix agent will confirm the
            details of your offer and personally get in touch with you before
            submitting it to the seller.
          </p>
        )}
      </div>
      <div className={styles['right-section']}>
        <Listing listing={listing} />
        <div className={styles['contact-box']}>
          <div className={styles['contact-img']}>
            <img src="/images/tyler_form.png" width={60} height={57} />
          </div>
          <div className={styles['contact-info']}>
            <div className={styles['contact-title']}>
              Have a question? Give us a call.
            </div>
            <a href="tel:6153545731" className={styles['phone-number']}>
              615.354.5731
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepperFormLayout;
