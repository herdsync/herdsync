import { StyleSheet } from "react-native";
import { height, width } from "../../utils/dimension";
import { AppColors } from "../../utils";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    borderWidth: width(0.1),
    borderColor: AppColors.primary,
    width: "80%",
    height: height(50),
    backgroundColor: AppColors.white,

    // padding: width(3),
    borderRadius: width(3),
    alignItems: "center",
    // justifyContent: "space-evenly",
    paddingVertical: height(1),
  },
  primaryText: {
    color: AppColors.black,
    fontSize: height(2.5),
    fontWeight: "bold",
    marginVertical: height(1),
  },
  secondaryText: {
    color: AppColors.white,
    //fontSize: 16,
    marginVertical: 10,
  },
  button: {
    backgroundColor: AppColors.black,
    height: height(5),
    marginTop: height(1),
  },
  buttonText: {
    color: "white",
  },
  dropDownItemStyle: {
    borderBottomColor: AppColors.gray,
    borderBottomWidth: height(0.1),
    width: "90%",
    alignSelf: "center",
  },
  dropDownContainer: { width: "100%" },
});

export default styles;
