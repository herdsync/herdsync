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
  Milkability,
  Mothering_Ability,
  Teat_Score,
  Udder_Score,
} from "../../utils/constants";
import styles from "./styles";
import { Entypo } from "@expo/vector-icons";
import cowInfoForm from "./valdiation";

const CowInfoModal = ({
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
              fieldName="milk"
              errorMsg={errors?.milk?.message}
              inputStyles={{
                fontSize: height(2),
                color: AppColors.black,
              }}
              dropdownTextStyles={{
                color: AppColors.black,
                fontSize: height(2),
              }}
              dropDownItemStyle={styles.dropDownItemStyle}
              data={Milkability}
              title=""
              mainStyleContainer={styles.dropDownContainer}
              setSelected={() => {}}
              placeholder={"Select Milk ability"}
            />

            <DropDownMenu
              formControl={control}
              fieldName="depature"
              errorMsg={errors?.depature?.message}
              inputStyles={{
                fontSize: height(2),
                color: AppColors.black,
              }}
              dropdownTextStyles={{
                color: AppColors.black,
                fontSize: height(2),
              }}
              dropDownItemStyle={styles.dropDownItemStyle}
              data={Depature_Reason}
              title=""
              placeholder={"Select Depature Reason"}
              mainStyleContainer={styles.dropDownContainer}
              setSelected={() => {}}
            />
            <DropDownMenu
              formControl={control}
              fieldName="mother"
              errorMsg={errors?.mother?.message}
              inputStyles={{
                fontSize: height(2),
                color: AppColors.black,
              }}
              dropdownTextStyles={{
                color: AppColors.black,
                fontSize: height(2),
              }}
              dropDownItemStyle={styles.dropDownItemStyle}
              data={Mothering_Ability}
              title=""
              placeholder={"Select Mothering Ability"}
              mainStyleContainer={styles.dropDownContainer}
              setSelected={() => {}}
            />
            <DropDownMenu
              formControl={control}
              fieldName="udder"
              errorMsg={errors?.udder?.message}
              inputStyles={{
                fontSize: height(2),
                color: AppColors.black,
              }}
              dropdownTextStyles={{
                color: AppColors.black,
                fontSize: height(2),
              }}
              dropDownItemStyle={styles.dropDownItemStyle}
              data={Udder_Score}
              title=""
              placeholder={"Select Udder Score"}
              mainStyleContainer={styles.dropDownContainer}
              setSelected={() => {}}
            />
            <DropDownMenu
              formControl={control}
              fieldName="teat"
              errorMsg={errors?.teat?.message}
              inputStyles={{
                fontSize: height(2),
                color: AppColors.black,
              }}
              dropdownTextStyles={{
                color: AppColors.black,
                fontSize: height(2),
              }}
              dropDownItemStyle={styles.dropDownItemStyle}
              data={Teat_Score}
              title=""
              placeholder={"Select Teat Score"}
              mainStyleContainer={styles.dropDownContainer}
              setSelected={() => {}}
            />
            <DropDownMenu
              formControl={control}
              fieldName="feet"
              errorMsg={errors?.feet?.message}
              inputStyles={{
                fontSize: height(2),
                color: AppColors.black,
              }}
              dropdownTextStyles={{
                color: AppColors.black,
                fontSize: height(2),
              }}
              dropDownItemStyle={styles.dropDownItemStyle}
              data={Feet_and_Legs}
              title=""
              placeholder={"Select Feet and Legs"}
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

export default CowInfoModal;
