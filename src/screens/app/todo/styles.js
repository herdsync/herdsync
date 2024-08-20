import { StyleSheet } from "react-native";
import { AppColors } from "../../../utils";
import { height, width } from "../../../utils/dimension";

const styles = StyleSheet.create({
  button: {
    width: width(80),
    position: "absolute",
    bottom: height(3),

    paddingVertical: height(1),
  },
});
export default styles;
