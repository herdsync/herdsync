import * as yup from "yup";

const birthValidateForm = yup.object().shape({
  id: yup.string().required("Cow Id is required."),
  gender: yup.string().required("Gender is required."),
  calving: yup.string().required("Calving difficulty is required."),
  size: yup.string().required("Calf size is required."),
  vigour: yup.string().required("Calf vigour is required."),
  birthWeight: yup.string().required("Birth Weight is required."),
  breed: yup.string().required("Breed size is required."),
  Comment: yup.string().required("Comment is required."),
  dob: yup.string().optional("Date of birth is required."),
});

export default birthValidateForm;
