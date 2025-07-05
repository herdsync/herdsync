import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useForm } from "react-hook-form";

import LoginFormValidation from "./valdiation"; // Correct the import path as needed
import styles from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { height, width } from "../../../utils/dimension";
import { AppColors } from "../../../utils";
import { InputField } from "../../../components/input";
import CustomText, { LargeText, SmallText } from "../../../components/text";
import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import Button from "../../../components/button";
import { ScreenNames } from "../../../Routes/routes";
import ScreenWrapper from "../../../components/screen-wrapper";
import Spacer from "../../../components/spacer";
import LogoIcon from "../../../../assets/Icons";
import { login } from "../../../Redux/Actions/Auth";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../../firebaseconfig";

export default function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const passwordRef = useRef(null);
  const [ConfirmpasswordHide, setConfirmpasswordHide] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(LoginFormValidation),
  });

  const checkUser = async (email, password) => {
    console.log("checking user", email, password);
    let res;
    try {
      const docRef = doc(firestore, "DevelopmentUsers", email.trim());
      const userDoc = await getDoc(docRef);
      res = userDoc.data();
    } catch (err) {
      console.log(err);
      setLoading(false);
      return;
    }
    if (res) {
      if (res.password === password) {
        dispatch(login(res));
        setLoading(false);

      } else {
        console.log("wrong password");
        Toast.show({
          text1: "Wrong password",
          type: "error",
          text2: "Your password is incorrect",
        });
      }
    } else {
      console.log("user not found");
      Toast.show({
        text1: "User not found",
        type: "error",
        text2: "No user with this email exists",
      });
    }
    setLoading(false);
  };
  const loginHandler = async (values) => {
    setLoading(true);
    await checkUser(values.email, values.password);
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
          <CustomText
            textAlign="center"
            textProps={{ fontFamily: "bold" }}
            textStyles={{ fontFamily: "bold" }}
            size={5}
          >
            Sign In
          </CustomText>
          <Spacer vertical={height(1)} />
          <CustomText textAlign="center" size={2}>
            Please enter your email and password to continue.
          </CustomText>
          <Spacer vertical={height(2)} />
          <InputField
            control={control}
            prefix={
              <AntDesign
                name={"mail"}
                size={height(3)}
                style={{ marginRight: height(1) }}
                color={AppColors.wihte5}
              />
            }
            name="email"
            keyboardType="email-address"
            containerStyles={{
              width: "90%",
              alignSelf: "center",
              backgroundColor: AppColors.white,
            }}
            textFieldContainer={{
              width: "100%",
              backgroundColor: AppColors.white,
              borderColor: AppColors.secondary,
              borderWidth: width(0.2),
            }}
            textFieldInnerContainer={{ width: "100%" }}
            onSubmit={() => passwordRef?.current?.focus()}
            keytype="next"
            label=""
            placeholder="Enter email"
            error={errors.email}
          />
          <InputField
            ref={passwordRef}
            prefix={
              <EvilIcons
                name={"lock"}
                size={height(4)}
                color={AppColors.wihte5}
              />
            }
            containerStyles={{ width: "90%", alignSelf: "center" }}
            textFieldContainer={{
              width: "100%",
              backgroundColor: AppColors.white,
              borderColor: AppColors.secondary,
              borderWidth: width(0.2),
            }}
            textFieldInnerContainer={{ width: "100%" }}
            label=""
            control={control}
            name="password"
            secureTextEntry={ConfirmpasswordHide}
            suffix={
              <TouchableOpacity
                onPress={() => {
                  setConfirmpasswordHide(!ConfirmpasswordHide);
                }}
              >
                <Feather
                  name={ConfirmpasswordHide ? "eye-off" : "eye"}
                  color={AppColors.secondary}
                  size={height(2)}
                />
              </TouchableOpacity>
            }
            placeholder="Enter Password"
            error={errors.password}
          />
          <View style={{ width: "95%" }}>
            <CustomText
              color={AppColors.primary}
              onPress={() => navigation?.navigate(ScreenNames.FORGOT_PASSWORD)}
              textAlign="right"
              size={2}
            >
              Forgot Password?
            </CustomText>
          </View>
          <Spacer vertical={height(2)} />
          <Button
            disabled={!isValid}
            loading={loading}
            textStyle={{ fontWeight: "bold" }}
            containerStyle={styles.button}
            onPress={handleSubmit(loginHandler)}
          >
            Log In
          </Button>
        </View>

        <View
          style={{
            marginTop: height(2),
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CustomText color={AppColors.black} size={1.5} textAlign="center">
            Don't have an Account?
          </CustomText>
          <CustomText
            onPress={() => {
              navigation?.navigate(ScreenNames.SIGN_UP);
            }}
            color={AppColors.primary}
            textStyles={{ marginLeft: height(1) }}
            textDecorationLine="underline"
            size={2}
            textAlign="center"
          >
            Sign Up
          </CustomText>
        </View>
      </View>
    </ScreenWrapper>
  );
}
