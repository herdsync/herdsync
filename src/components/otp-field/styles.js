import { Platform, StyleSheet } from "react-native";
import { height, width } from "../../utils/dimension";
import { AppColors } from "../../utils";

const styles = StyleSheet.create({
  otpContainer: {
    // alignSelf: "center",
    // height: width(5),
    flex: 1,
    width: "80%",
    alignSelf: "center",
    marginTop: height(1),
  },
  inputStyle: {
    backgroundColor: AppColors.white,
    borderWidth: width(0.1),
    width: width(10),
    height: width(10),
    alignSelf: "center",
    borderRadius: width(1),
    borderColor: AppColors.secondary,
    color: AppColors.secondary,
    fontSize: width(4),
    //fontFamily: FontFamily.RobotoRegular,
  },
  underlineStyleHighLighted: {
    borderColor: AppColors.black,
  },
});

export default styles;
