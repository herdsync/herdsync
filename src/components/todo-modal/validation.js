import * as yup from "yup";

const todoValidation = yup.object().shape({
  title: yup.string().required("Title is required."),
  description: yup.string().required("Description is required"),
});

export default todoValidation;
