import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import CustomText from "../text";
import Button from "../button";
import { height, width } from "../../utils/dimension";
import { AppColors } from "../../utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Modal from "react-native-modal";

import birthValidateForm from "./valdiation";
import { InputField } from "../input";
import DropDownMenu from "../drop-down-menu";
import {
  CALF_VIGOUR,
  CALVING_DIFFICULTY,
  GENDER,
  SIZE,
} from "../../utils/constants";
import styles from "./styles";
import { Entypo } from "@expo/vector-icons";
import { CalenderField } from "../calender";

const BirthEventModal = ({
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
    resolver: yupResolver(birthValidateForm), // Replace with your validation schema
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
      onBackdropPress={onClose}
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
            <CalenderField
              control={control}
              name="dob"
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
              placeholder="DD/MM/YYYY"
              error={errors.dob}
            />
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
              name="breed"
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
              placeholder="Enter breed size"
              error={errors.breed}
            />
            <DropDownMenu
              formControl={control}
              fieldName="calving"
              errorMsg={errors?.calving?.message}
              inputStyles={{
                fontSize: height(2),
                color: AppColors.black,
              }}
              dropdownTextStyles={{
                color: AppColors.black,
                fontSize: height(2),
              }}
              dropDownItemStyle={styles.dropDownItemStyle}
              data={CALVING_DIFFICULTY}
              title=""
              placeholder={"Select Calving DifficultY"}
              mainStyleContainer={styles.dropDownContainer}
              setSelected={() => {}}
            />
            <DropDownMenu
              formControl={control}
              fieldName="size"
              errorMsg={errors?.size?.message}
              inputStyles={{
                fontSize: height(2),
                color: AppColors.black,
              }}
              dropdownTextStyles={{
                color: AppColors.black,
                fontSize: height(2),
              }}
              dropDownItemStyle={styles.dropDownItemStyle}
              data={SIZE}
              title=""
              mainStyleContainer={styles.dropDownContainer}
              setSelected={() => {}}
              placeholder={"Select Size"}
            />
            <DropDownMenu
              formControl={control}
              fieldName="vigour"
              errorMsg={errors?.vigour?.message}
              inputStyles={{
                fontSize: height(2),
                color: AppColors.black,
              }}
              dropdownTextStyles={{
                color: AppColors.black,
                fontSize: height(2),
              }}
              dropDownItemStyle={styles.dropDownItemStyle}
              data={CALF_VIGOUR}
              title=""
              mainStyleContainer={styles.dropDownContainer}
              setSelected={() => {}}
              placeholder={"Select Calf Vigour"}
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
              placeholder="Enter Birth Weight"
              error={errors.birthWeight}
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

export default BirthEventModal;
