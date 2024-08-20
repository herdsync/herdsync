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
import {
  Depature_Reason,
  DOCILITY,
  Feet_and_Legs,
  GENDER,
  Milkability,
  Mothering_Ability,
  QUALITY,
  Teat_Score,
  Udder_Score,
} from "../../utils/constants";
import styles from "./styles";
import { Entypo } from "@expo/vector-icons";
import cowInfoForm from "./valdiation";
import { CalenderField } from "../calender";

const WeightModal = ({
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
              placeholder="Enter cow tag"
              error={errors.id}
            />

            <InputField
              control={control}
              name="weight"
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
              placeholder="Enter Weight in kg"
              error={errors.weight}
            />
            <CalenderField
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
              keytype="next"
              label=""
              placeholder="Enter Date of weight"
              error={errors.birthWeight}
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

export default WeightModal;
