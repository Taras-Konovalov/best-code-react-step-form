import { useState, useContext, useRef } from 'react';
import PageLayout from 'layouts/PageLayout';
import StepperFormLayout from 'layouts/StepperFormLayout';
import { useRouter } from 'next/router';
import PersonalInformation from 'components/MakeOffer/PersonalInformation';
import Financing from 'components/MakeOffer/Financing';
import ContingenciesForm from 'components/ContingenciesForm';
import { FormContext } from 'contexts/FormContext';
import { getListing } from 'controllers/listing';
import Review from 'components/MakeOffer/Review';
import axios from 'axios';
import createOfferFormData from 'utils/createOfferFormData';
// import { toast } from 'react-toastify';

const getSteps = () => [
  'Personal Info',
  'Financing',
  'Contingencies',
  'Review',
];

// function that will return form components
function StepContent({ step, ...props }) {
  switch (step) {
    case 0:
      return <PersonalInformation {...props} />;
    case 1:
      return <Financing {...props} />;
    case 2:
      return <ContingenciesForm {...props} />;
    case 3:
      return <Review listPrice={props.listPrice} address={props.address} />;
    default:
      return <PersonalInformation {...props} />;
  }
}

const MakeOfferFormPage = ({ listing }) => {
  const router = useRouter();
  const { setMakeOfferFormData, formState, resetMakeOfferFormData } =
    useContext(FormContext);
  const stepRef = useRef(null);

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(!isLoading);
    try {
      const offerData = createOfferFormData({
        ...formState.personalInformation,
        ...formState.financing,
        ...formState.contingencies,
        ...listing,
      });

      await axios.post(
        `${process.env.NEXT_PUBLIC_CONTENT_BASE_URL}/offers`,
        offerData
      );

      await axios.post('/api/offers', {
        fullName: formState.personalInformation.fullLegalName,
        address: listing.address.full,
      });
      setIsLoading(!isLoading);
      router.push('/make-offer/form/success');
    } catch (error) {
      // toast.error(`Error sending your offer`);
      console.log(error);
    }
  };

  const handleNext = () => {
    if (stepRef.current) {
      stepRef.current?.validateForm().then(errors => {
        if (_.isEmpty(errors)) {
          stepRef.current.handleSubmit();
          setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
      });
      return;
    }
    if(stepRef.current) {
      if(!stepRef.current.isValid) return;
      stepRef.current.handleSubmit()
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (!activeStep) {
      router.back();
    }
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <PageLayout
      canonical="https://www.felixhomes.com/make-offer-form"
      title="Buy Your Nashville Home With a Lower Commission | felix"
      description="Make an offer online on any home for sale"
      isNavTransparent={false}
    >
      {!isLoading && (
        <StepperFormLayout
          steps={steps}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleSubmit={handleSubmit}
          listing={listing}
        >
          <StepContent
            step={activeStep}
            onSubmit={setMakeOfferFormData}
            formRef={stepRef}
            address={listing.address.full}
            listPrice={listing.listPrice}
          />
        </StepperFormLayout>
      )}
      {isLoading && <Loader />}
    </PageLayout>
  );
};

export async function getServerSideProps({ query }) {
  const { mlsId } = query;

  const listing = await getListing(mlsId);

  if (!listing) {
    return {
      redirect: {
        permanent: false,
        destination: '/make-offer',
      },
    };
  }

  return {
    props: {
      listing,
    },
  };
}

export default MakeOfferFormPage;
