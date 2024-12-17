import { useReducer, createContext } from 'react';

export const FormContext = createContext();

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MAKE_OFFER_FORM':
      return {
        ...state,
        ...action.payload,
      };
    case 'RESET_MAKE_OFFER_FORM':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

let thisDay = new Date();

let futureDay = thisDay.setDate(thisDay.getDate() + 35);

export const OfferFormContextProvider = props => {
  const initialValues = {
    personalInformation: {
      fullLegalName: '',
      email: '',
      phoneNumber: '',
      coBuyerFullLegalName: '',
      coBuyerEmail: '',
      coBuyerPhoneNumber: '',
      isCoBuyer: false,
    },
    financing: {
      offerPrice: '',
      earnestMoneyDeposit: '',
      financingOption: 'Mortgage',
      loanType: '',
      downpayment: '',
      preApprovalLetter: null,
      proofOfFunds: null,
    },
    contingencies: {
      inspectionContingency: '',
      financingContingency: '',
      appraisalContingency: '',
      saleOfHomeContingency: '',
      contingentOnSaleOf: '',
      closingDate: new Date(futureDay),
      insurancePaidBy: '',
      hasHomeWarranty: '',
      homeWarrantyPaidBy: '',
      hasRefrigerator: '',
      hasWasherAndDryer: '',
      otherTerms: '',
    },
  };

  const [formState, dispatch] = useReducer(formReducer, initialValues);

  const setMakeOfferFormData = data => {
    dispatch({ type: 'SET_MAKE_OFFER_FORM', payload: data });
  };

  const resetMakeOfferFormData = () => {
    dispatch({ type: 'RESET_MAKE_OFFER_FORM', payload: initialValues });
  };

  const value = {
    formState,
    setMakeOfferFormData,
    resetMakeOfferFormData,
  };

  return (
    <FormContext.Provider value={value}>{props.children}</FormContext.Provider>
  );
};
