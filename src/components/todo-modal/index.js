import React, { useEffect } from "react";
import { ActivityIndicator, Keyboard, Text, View } from "react-native";
import Modal from "react-native-modal";
import { InputField } from "../input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import todoValidation from "./validation";
import { AppColors } from "../../utils";
import { height, width } from "../../utils/dimension";
import Button from "../button";
import styles from "./styles";
import CustomText from "../text";

export default function TodoModal({
  isVisible,
  onPress,
  loading = false,
  selectedItem,
  onClose,
}) {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    reset,
    setValue,
  } = useForm({
    mode: "all",
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: yupResolver(todoValidation), // Replace with your validation schema
  });
  const sendData = (values) => {
    onPress(values);
    setTimeout(() => {
      setValue("title", "");
      setValue("description", "");
    }, 500);
  };
  useEffect(() => {
    if (selectedItem) {
      setValue("title", selectedItem.title);
      setValue("description", selectedItem.description);
    }
  }, [selectedItem]);
  return (
    <Modal
      animationIn={"lightSpeedIn"}
      animationOut={"lightSpeedOut"}
      onBackdropPress={() => {
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
        } else {
          onClose && onClose();
        }
      }}
      isVisible={isVisible}
      backdropOpacity={0.4}
      avoidKeyboard
    >
      <View style={styles.container}>
        <CustomText children={"Add Todo"} size={3} />
        <InputField
          control={control}
          name="title"
          keyboardType="default"
          containerStyles={{
            width: "90%",
            alignSelf: "center",
            backgroundColor: AppColors.white,
          }}
          textFieldContainer={{
            width: "100%",
            backgroundColor: AppColors.white,
            borderBottomColor: AppColors.secondary,
            borderBottomWidth: width(0.2),
          }}
          textFieldInnerContainer={{ width: "100%" }}
          keytype="next"
          label="Title"
          placeholder="Enter Title"
          error={errors.title}
          maxLength={17}
        />
        <InputField
          control={control}
          name="description"
          keyboardType="default"
          containerStyles={{
            width: "90%",
            alignSelf: "center",
            backgroundColor: AppColors.white,
          }}
          textFieldContainer={{
            width: "100%",
            backgroundColor: AppColors.white,
            borderBottomColor: AppColors.secondary,
            borderBottomWidth: width(0.2),
          }}
          textFieldInnerContainer={{ width: "100%" }}
          keytype="next"
          label="Description"
          placeholder="Enter Description"
          error={errors.description}
          multiline
          numberOfLines={4}
          maxLength={200}
        />
        <Button
          loading={loading}
          children={"Continue"}
          onPress={handleSubmit(sendData)}
          containerStyle={{ width: "80%", paddingVertical: height(1) }}
        />
      </View>
    </Modal>
  );
}
