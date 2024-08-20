import * as yup from "yup";

const searchForm = yup.object().shape({
  search: yup.string().optional("Cow Id is required."),
});

export default searchForm;
