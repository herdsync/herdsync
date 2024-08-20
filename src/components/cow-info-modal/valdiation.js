import * as yup from "yup";

const cowInfoForm = yup.object().shape({
  id: yup.string().required("Cow Id is required."),
  milk: yup.string().required("Milk ability is required."),
  depature: yup.string().required("Depature reason is required."),
  docility: yup.string().required("Docility is required."),
  mother: yup.string().required("Mothering ability is required."),
  udder: yup.string().required("Udder score is required."),
  teat: yup.string().required("Teat score is required."),
  feet: yup.string().required("Feet and legs is required."),
  Comment: yup.string().required("Comment is required."),
});

export default cowInfoForm;
