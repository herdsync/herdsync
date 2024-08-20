import { StyleSheet } from "react-native";
import { AppColors } from "../../../utils";
import { height, width } from "../../../utils/dimension";

const styles = StyleSheet.create({
  button: {
    width: width(80),
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
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomColor: AppColors.black,
    borderBottomWidth: 1,
    marginTop: 10, // Adjust this value based on your height(1) function
    paddingVertical: 5, // Adjust this value based on your height(0.5) function
  },
  recordContainer: {
    marginTop: 10,
  },

  text: {
    fontSize: 16,
  },
  noRecords: {
    fontSize: 16,
    color: AppColors.black,
  },
  categoryContainer: {
    marginBottom: 20,
    flex: 1,
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
  tableRow: {
    flexDirection: "row",
    borderBottomColor: AppColors.black,
    borderBottomWidth: 1,
    // width: width(100),
    flex: 1,
    paddingVertical: 5,
  },
  tableCell: {
    padding: 10,
    borderRightColor: AppColors.black,
    borderRightWidth: 1,
    minWidth: 150,
    textAlign: "center",
    // flex: 1,
    // width: width(5),
  },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    borderRightWidth: 1,
    minWidth: 150,
  },
});
export default styles;
