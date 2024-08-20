import * as yup from "yup";

const cowInfoForm = yup.object().shape({
  id: yup.string().required("Cow Id is required."),
  weight: yup.string().required("Weight is required."),
  birthWeight: yup.string().required("Birth date and weight  is required."),
});

export default cowInfoForm;
