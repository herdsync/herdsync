import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  Pressable,
} from "react-native";
import CustomText from "../text";
import Button from "../button";
import { height, width } from "../../utils/dimension";
import { AppColors } from "../../utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Modal from "react-native-modal";

import { InputField } from "../input";
import DropDownMenu from "../drop-down-menu";
import { DOCILITY, GENDER, QUALITY } from "../../utils/constants";
import styles from "./styles";
import { Entypo } from "@expo/vector-icons";
import calfInfoForm from "./valdiation";

const CalfInfoModal = ({
  visible,
  onClose,
  primaryText,
  buttonText,
  containerStyle,
  buttonStyle,
  buttonTextStyle,
  PrimarytextStyle,
  loading,
  onPress,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(calfInfoForm), // Replace with your validation schema
  });
  const handleValue = async (value) => {
    console.log("value", value);
    onPress(value);
    reset();
  };
  return (
    <Modal
      transparent={true}
      visible={visible}
      onBackdropPress={() => {
        onClose();
      }}
      onBackButtonPress={onClose}
      animationIn="fadeInUpBig"
      animationOut="fadeOutDownBig"
      animationInTiming={1}
      avoidKeyboard
      style={{
        margin: 0,
        padding: 0,
        justifyContent: "flex-end",
      }}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, containerStyle]}>
          <Pressable
            onPress={() => onClose()}
            style={{
              position: "absolute",
              right: height(2),
              top: height(2),
            }}
          >
            <Entypo name="cross" color={AppColors.black} size={height(3)} />
          </Pressable>
          {primaryText && (
            <CustomText
              size={1.8}
              textStyles={[styles.primaryText, PrimarytextStyle]}
              textAlign="center"
            >
              {primaryText}
            </CustomText>
          )}
          <ScrollView showsVerticalScrollIndicator={false}>
            <InputField
              control={control}
              name="id"
              keyboardType="email-address"
              containerStyles={{
                width: "100%",
                alignSelf: "center",
                backgroundColor: AppColors.transparent,
              }}
              textFieldContainer={{
                width: "100%",
                backgroundColor: AppColors.transparent,
                borderColor: AppColors.secondary,
                borderWidth: width(0.2),
              }}
              textFieldInnerContainer={{ width: "100%" }}
              keytype="next"
              label=""
              placeholder="Enter id of cow"
              error={errors.id}
            />
            <DropDownMenu
              formControl={control}
              fieldName="docility"
              errorMsg={errors?.docility?.message}
              inputStyles={{
                fontSize: height(2),
                color: AppColors.black,
              }}
              dropdownTextStyles={{
                color: AppColors.black,
                fontSize: height(2),
              }}
              dropDownItemStyle={styles.dropDownItemStyle}
              data={DOCILITY}
              title=""
              placeholder={"Select Docility"}
              mainStyleContainer={styles.dropDownContainer}
              setSelected={() => {}}
            />
            <DropDownMenu
              formControl={control}
              fieldName="quality"
              errorMsg={errors?.quality?.message}
              inputStyles={{
                fontSize: height(2),
                color: AppColors.black,
              }}
              dropdownTextStyles={{
                color: AppColors.black,
                fontSize: height(2),
              }}
              dropDownItemStyle={styles.dropDownItemStyle}
              data={QUALITY}
              title=""
              mainStyleContainer={styles.dropDownContainer}
              setSelected={() => {}}
              placeholder={"Select Quality"}
            />

            <InputField
              control={control}
              name="birthWeight"
              keyboardType="email-address"
              containerStyles={{
                width: "100%",
                alignSelf: "center",
                backgroundColor: AppColors.transparent,
              }}
              textFieldContainer={{
                width: "100%",
                backgroundColor: AppColors.transparent,
                borderColor: AppColors.secondary,
                borderWidth: width(0.2),
              }}
              textFieldInnerContainer={{ width: "100%" }}
              keytype="weight"
              label=""
              placeholder="Enter Birth and Weight"
              error={errors.birthWeight}
            />
            <DropDownMenu
              formControl={control}
              fieldName="gender"
              errorMsg={errors?.gender?.message}
              inputStyles={{
                fontSize: height(2),
                color: AppColors.black,
              }}
              dropdownTextStyles={{
                color: AppColors.black,
                fontSize: height(2),
              }}
              dropDownItemStyle={styles.dropDownItemStyle}
              data={GENDER}
              title=""
              placeholder={"Select Gender"}
              mainStyleContainer={styles.dropDownContainer}
              setSelected={() => {}}
            />

            <InputField
              control={control}
              name="Comment"
              keyboardType="email-address"
              containerStyles={{
                width: "100%",
                alignSelf: "center",
                backgroundColor: AppColors.transparent,
              }}
              textFieldContainer={{
                width: "100%",
                backgroundColor: AppColors.transparent,
                borderColor: AppColors.secondary,
                borderWidth: width(0.2),
              }}
              textFieldInnerContainer={{ width: "100%" }}
              keytype="next"
              label=""
              placeholder="Enter Comments"
              error={errors.Comment}
            />
            {buttonText && (
              <Button
                loading={loading}
                containerStyle={[buttonStyle]}
                onPress={handleSubmit(handleValue)}
              >
                <Text style={[styles.buttonText, buttonTextStyle]}>
                  {buttonText}
                </Text>
              </Button>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CalfInfoModal;
