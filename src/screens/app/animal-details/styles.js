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
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    paddingHorizontal: width(4),
    width: width(90),
    borderRadius: height(3),
    zIndex: 100,
    borderColor: AppColors.primary,
    borderWidth: height(0.2),
    paddingVertical: height(1),
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: AppColors.black,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  tableCell: {
    padding: 10,
    borderRightColor: AppColors.black,
    borderRightWidth: 1,
    minWidth: 150,
    textAlign: "center",
    flex: 1,
  },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    // flex: 1,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textTransform: "capitalize",
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
    textTransform: "capitalize",
  },
});
export default styles;
