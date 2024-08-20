import { View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../components/screen-wrapper";
import { AppColors } from "../../../utils";
import Header from "../../../components/header";
import { height } from "../../../utils/dimension";
import Spacer from "../../../components/spacer";
import Button from "../../../components/button";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/Actions/Auth";
import styles from "./styles";

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();

  return (
    <ScreenWrapper
      backgroundColor={AppColors.white}
      statusBarColor={AppColors.primary}
      barStyle="dark-content"
    >
      <Header
        showLeft={true}
        showBack
        title="Search"
        onBackPress={() => navigation?.goBack()}
      />
      <View style={{ flexGrow: 1, alignItems: "center" }}>
        <Spacer vertical={height(2)} />
        <Button
          textStyle={{ fontWeight: "bold" }}
          containerStyle={styles.button}
          onPress={() => dispatch(logout())}
        >
          Log out
        </Button>
      </View>
    </ScreenWrapper>
  );
}
