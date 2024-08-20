import OTPInputView from "@twotalltotems/react-native-otp-input";
import React, { forwardRef } from "react";
import { StyleProp, ViewStyle } from "react-native";
import styles from "./styles";

const OtpField = forwardRef(
  ({ code, onCodeChanged, onCodeFilled, style }, ref) => {
    return (
      <OTPInputView
        ref={ref}
        style={[styles.otpContainer, style]}
        pinCount={4}
        onCodeChanged={onCodeChanged}
        autoFocusOnLoad={true}
        codeInputFieldStyle={styles.inputStyle}
        codeInputHighlightStyle={styles.inputStyle}
        onCodeFilled={onCodeFilled}
      />
    );
  }
);

export default OtpField;
