import * as yup from "yup";

const cowInfoForm = yup.object().shape({
  id: yup.string().required("Cow Id is required."),
  given: yup.string().required("Given by is required."),
  treatment: yup.string().required("Treatment is required."),
  event: yup.string().required("Event Code is required."),
  date: yup.string().required("Date is required."),
  withdraw: yup.string().required("Withdraw Period is required."),
  batch: yup.string().required("Batch is required."),
});

export default cowInfoForm;
