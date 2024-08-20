import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import CustomText from "../text";
import Button from "../button";
import { height, width } from "../../utils/dimension";
import { AppColors } from "../../utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Modal from "react-native-modal";

import { InputField } from "../input";
import DropDownMenu from "../drop-down-menu";
import { In_Calf } from "../../utils/constants";
import styles from "./styles";
import { Entypo } from "@expo/vector-icons";
import cowInfoForm from "./valdiation";
import Spacer from "../spacer";
import { CalenderField } from "../calender";

const BreedingModal = ({
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
    resolver: yupResolver(cowInfoForm), // Replace with your validation schema
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
              keyboardType="numeric"
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
              placeholder="Enter cow id"
              error={errors.id}
            />

            <CalenderField
              control={control}
              name="calvind"
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
              placeholder="Enter Calvind date"
              error={errors.calvind}
            />
            <InputField
              control={control}
              name="heat"
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
              placeholder="Enter Heat served"
              error={errors.heat}
            />
            <DropDownMenu
              formControl={control}
              fieldName="inCalf"
              errorMsg={errors?.inCalf?.message}
              inputStyles={{
                fontSize: height(2),
                color: AppColors.black,
              }}
              dropdownTextStyles={{
                color: AppColors.black,
                fontSize: height(2),
              }}
              dropDownItemStyle={styles.dropDownItemStyle}
              data={In_Calf}
              title=""
              placeholder={"Select In Calf"}
              mainStyleContainer={styles.dropDownContainer}
              setSelected={() => {}}
            />
            <Spacer vertical={height(1)} />
            <CustomText
              children={"Serve Details:"}
              size={2}
              textStyles={{ fontWeight: "bold" }}
            />
            <CalenderField
              control={control}
              name="date"
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
              placeholder="Enter Date"
              error={errors.date}
            />
            <InputField
              control={control}
              name="bulll"
              keyboardType="numeric"
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
              placeholder="Enter Bull Id"
              error={errors.bulll}
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

export default BreedingModal;
