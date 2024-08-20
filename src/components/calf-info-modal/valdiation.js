import * as yup from "yup";

const calfInfoForm = yup.object().shape({
  id: yup.string().required("Cow Id is required."),
  gender: yup.string().required("Gender is required."),
  quality: yup.string().required("Quality is required."),
  docility: yup.string().required("Docility is required."),
  birthWeight: yup.string().required("Birth Weight is required."),
  Comment: yup.string().required("Comment is required."),
});

export default calfInfoForm;
