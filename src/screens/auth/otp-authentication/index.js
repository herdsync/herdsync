import React, { useRef, useState } from "react";
import { Image, View } from "react-native";
import { ScreenNames } from "../../../Routes/routes";
import { AppColors } from "../../../utils";
import { LargeText, SmallText } from "../../../components/text";
import OtpField from "../../../components/otp-field";
import Spacer from "../../../components/spacer";
import Button from "../../../components/button";
import styles from "./styles";
import ScreenWrapper from "../../../components/screen-wrapper";
import { height } from "../../../utils/dimension";
import LogoIcon from "../../../../assets/Icons";

export default function OTP({ navigation }) {
  const [code, setCode] = useState("");
  const otpInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const loginHandler = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation?.navigate(ScreenNames.RESET_PASSWORD);
    }, 3000);
  };

  const handleCodeChanged = (newCode) => {
    console.log("handle", newCode);
    setCode(newCode);
  };

  const handleCodeFilled = (filledCode) => {
    console.log("Code filled:", filledCode);
  };
  return (
    <ScreenWrapper
      statusBarColor={AppColors.white}
      barStyle="dark-content"
      scrollEnabled
      backgroundColor={AppColors.white}
    >
      <View style={styles.mainViewContainer}>
        <LogoIcon height={height(20)} width={height(20)} />

        <View style={styles.inputContainer}>
          <LargeText
            textAlign="center"
            textProps={{ fontFamily: "bold" }}
            textStyles={{ fontFamily: "bold" }}
            size={5}
          >
            Verification
          </LargeText>
          <Spacer vertical={height(1)} />
          <View style={{ width: "80%", alignSelf: "center" }}>
            <SmallText textAlign="center" size={2}>
              Please enter the verification code sent to your email{" "}
            </SmallText>
          </View>
          <Spacer vertical={height(2)} />
          <OtpField
            ref={otpInputRef}
            code={code}
            onCodeChanged={handleCodeChanged}
            onCodeFilled={handleCodeFilled}
          />
          <Spacer vertical={height(4)} />
          <Button
            loading={loading}
            textStyle={{ fontWeight: "bold" }}
            containerStyle={styles.button}
            onPress={loginHandler}
          >
            Verify Code
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
}
