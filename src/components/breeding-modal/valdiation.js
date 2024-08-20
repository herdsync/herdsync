import * as yup from "yup";

const cowInfoForm = yup.object().shape({
  id: yup.string().required("Cow Id is required."),
  heat: yup.string().required("Heat not served is required."),
  calvind: yup.string().required("Calvind Date is required."),
  inCalf: yup.string().required("in Calf is required."),
  date: yup.string().required("Serve date is required."),
  bulll: yup.string().required("Bull id is required."),
});

export default cowInfoForm;
