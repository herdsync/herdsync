import { View, FlatList, Pressable } from "react-native";
import React from "react";
import ScreenWrapper from "../../../components/screen-wrapper";
import { AppColors } from "../../../utils";
import Header from "../../../components/header";
import CustomText, { SmallText } from "../../../components/text";
import { height, width } from "../../../utils/dimension";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import Spacer from "../../../components/spacer";

export default function LAND_SCREEN({ navigation }) {
  const data = [
    {
      id: 1,
      name: "Soil Samples",
      image: require("../../../../assets/animalbg.jpg"),
    },
    {
      id: 2,
      name: "Map",
      image: require("../../../../assets/animalbg.jpg"),
    },
    {
      id: 3,
      name: "Fertilizer",
      image: require("../../../../assets/animalbg.jpg"),
    },
    {
      id: 4,
      name: "Manure",
      image: require("../../../../assets/animalbg.jpg"),
    },
    {
      id: 5,
      name: "Photo Scanning",
      image: require("../../../../assets/animalbg.jpg"),
    },
    {
      id: 6,
      name: "Slurry",
      image: require("../../../../assets/animalbg.jpg"),
    },
  ];

  const _renderItem = ({ item, index }) => {
    return (
      <Pressable style={styles?.textCard}>
        <CustomText
          color={AppColors.black}
          size={2.5}
          textAlign="center"
          textStyles={{
            fontWeight: "500",

            alignSelf: "center",
            paddingVertical: height(1.5),
          }}
        >
          {item?.name}
        </CustomText>
        <AntDesign name="plus" size={height(2)} color={AppColors.primary} />
      </Pressable>
    );
  };
  return (
    <ScreenWrapper
      backgroundColor={AppColors.white}
      statusBarColor={AppColors.primary}
      barStyle="dark-content"
    >
      <Header
        showLeft={true}
        showBack
        title="Animal"
        onBackPress={() => navigation?.goBack()}
      />
      <View style={{ flexGrow: 1, alignItems: "center" }}>
        <Spacer vertical={height(5)} />
        <FlatList
          data={data}
          renderItem={_renderItem}
          keyExtractor={(index, item) => item?.id?.toString()}
          ListEmptyComponent={
            <CustomText
              children={"No Data right now"}
              size={2}
              color={AppColors.black}
            />
          }
          ItemSeparatorComponent={<Spacer vertical={height(4)} />}
        />
      </View>
    </ScreenWrapper>
  );
}
