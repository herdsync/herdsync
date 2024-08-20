import React, { useEffect, useRef, useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { useForm } from "react-hook-form";
import { ScreenNames } from "../../../Routes/routes";
import { AppColors } from "../../../utils";
import styles from "./styles";
import SinupFormValidation from "./valdiation";
import ScreenWrapper from "../../../components/screen-wrapper";
import CustomText, { LargeText, SmallText } from "../../../components/text";
import Spacer from "../../../components/spacer";
import { InputField } from "../../../components/input";
import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import Button from "../../../components/button";
import LogoIcon from "../../../../assets/Icons";
import { height, width } from "../../../utils/dimension";
import { yupResolver } from "@hookform/resolvers/yup";
// import firestore from "@react-native-firebase/firestore";
import { login } from "../../../Redux/Actions/Auth";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../../../../firebaseconfig";

export default function SignUp({ navigation }) {
  // const usersCollection = firestore().collection("DevelopmentUsers");
  const dispatch = useDispatch();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [passwordHide, setPasswordHide] = useState(true);
  const [ConfirmpasswordHide, setConfirmpasswordHide] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(SinupFormValidation), // Replace with your validation schema
  });

  const loginHandler = async (values) => {
    setLoading(true);
    const docRef = await doc(
      firestore,
      "DevelopmentUsers",
      values.email.trim()
    );
    const exists = await getDoc(docRef);
    if (typeof exists.data() != "undefined") {
      console.log("user already exists");
      Toast.show({
        text1: "User already exists",
        type: "error",
        text2: "User with this email already exists",
      });
      setLoading(false);
    } else {
      await setDoc(doc(firestore, "DevelopmentUsers", values.email.trim()), {
        name: values.fullName.trim(),
        password: values.password.trim(),
        email: values.email.trim(),
        herId: values.herdId.trim(),
        county: values.county.trim(),
      })
        .then(async () => {
          const docRef = await doc(
            firestore,
            "DevelopmentUsers",
            values.email.trim()
          );
          await getDoc(docRef).then((res) => {
            dispatch(login(res.data()));
          });
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
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
            Sign Up
          </CustomText>
          <Spacer vertical={height(1)} />
          <CustomText textAlign="center" size={1.5}>
            Please enter your email and password to continue.
          </CustomText>
          <Spacer vertical={height(2)} />
          <InputField
            prefix={
              <AntDesign
                name={"user"}
                size={height(2.5)}
                style={{ marginRight: height(1) }}
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
            name="fullName"
            placeholder="Enter Full Name"
            error={errors.fullName}
          />
          <InputField
            prefix={
              <AntDesign
                name={"idcard"}
                size={height(2.5)}
                color={AppColors.wihte5}
                style={{ marginRight: height(1) }}
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
            name="herdId"
            placeholder="Enter Herd Id"
            error={errors.herdId}
          />
          <InputField
            prefix={
              <EvilIcons
                name={"location"}
                size={height(3)}
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
            name="county"
            placeholder="Enter County"
            error={errors.county}
          />
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
            onSubmit={() => confirmPasswordRef?.current?.focus()}
            name="password"
            placeholder="Enter Password"
            error={errors.password}
            secureTextEntry={passwordHide}
            suffix={
              <>
                <TouchableOpacity
                  onPress={() => {
                    setPasswordHide(!passwordHide);
                  }}
                >
                  <Feather
                    name={passwordHide ? "eye-off" : "eye"}
                    color={AppColors.secondary}
                    size={height(2)}
                  />
                </TouchableOpacity>
              </>
            }
          />
          <InputField
            ref={confirmPasswordRef}
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
            control={control}
            name="confirmPassword"
            placeholder="Enter Confirm Password"
            error={errors.confirmPassword}
          />

          <Spacer vertical={height(2)} />
          <Button
            loading={loading}
            disabled={!isValid}
            textStyle={{ fontWeight: "bold" }}
            containerStyle={styles.button}
            onPress={handleSubmit(loginHandler)}
          >
            Sign Up
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
            Already have an Account?
          </CustomText>
          <CustomText
            onPress={() => {
              navigation?.navigate(ScreenNames.LOGIN);
            }}
            color={AppColors.primary}
            textStyles={{ marginLeft: height(1) }}
            textDecorationLine="underline"
            size={2}
            textAlign="center"
          >
            Sign In
          </CustomText>
        </View>
      </View>
    </ScreenWrapper>
  );
}
