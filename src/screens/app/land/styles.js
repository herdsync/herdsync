import { StyleSheet } from "react-native";
import { AppColors } from "../../../utils";
import { height, width } from "../../../utils/dimension";

const styles = StyleSheet.create({
  button: {
    width: width(80),
    // position: "absolute",
    // bottom: height(3),
    // paddingVertical: height(1),
  },
  textCard: {
    //   height: height(5),
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
});
export default styles;
