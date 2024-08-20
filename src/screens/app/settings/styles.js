import { StyleSheet } from "react-native";
import { AppColors } from "../../../utils";
import { height, width } from "../../../utils/dimension";

const styles = StyleSheet.create({
  button: {
    width: width(80),
  },
  textCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width(4),
    width: width(90),
    borderRadius: height(3),
    zIndex: 100,
    borderColor: AppColors.primary,
    borderWidth: height(0.2),
  },
  button: {
    backgroundColor: AppColors.primary,
    width: "90%",
    paddingVertical: height(2),
    borderRadius: width(4),
  },
});
export default styles;
