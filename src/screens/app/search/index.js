import { ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/screen-wrapper";
import { AppColors } from "../../../utils";
import Header from "../../../components/header";

import { height, width } from "../../../utils/dimension";

import Spacer from "../../../components/spacer";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import searchForm from "./valdiation";
import { InputField } from "../../../components/input";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import CustomText from "../../../components/text";
import styles from "./styles";

export default function SearchScreen({ navigation }) {
  const user = useSelector((state) => state?.Auth?.user);
  const [found, setFound] = useState();
  const [error, setError] = useState("No Data Available");
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(searchForm), // Replace with your validation schema
  });

  const filterDataById = (values) => {
    let result = {};
    for (const key in user) {
      if (Array.isArray(user[key])) {
        result[key] = user[key]
          .filter((item) => item.id === values?.search)
          .map((item) => {
            const { Comment, ...rest } = item;
            return rest;
          });
      }
    }
    console.log("object", result);
    setFound(result);
  };

  const renderDetail = (key, value) => {
    if (key !== "time") {
      return (
        <View
          key={key}
          style={[
            styles.detailContainer,
            { flexDirection: key === "Comment" ? "column" : "row" },
          ]}
        >
          <CustomText
            children={`${key.charAt(0).toUpperCase() + key.slice(1)}:`}
            size={1.7}
            textAlign="left"
            textStyles={{ fontWeight: "500" }}
            color={AppColors.black}
          />
          <CustomText
            children={key === "birthWeight" ? `${value} Kg` : value}
            size={2}
            textAlign="justify"
            textStyles={{
              fontWeight: "bold",
              marginTop: key === "Comment" ? height(1) : 0,
              alignSelf: "flex-start",
            }}
            color={AppColors.black}
          />
        </View>
      );
    }
  };

  const renderTableHeader = (keys) => (
    <View style={[styles.tableRow]}>
      {keys.map((key) => (
        <>
          <Text key={key} style={[styles.tableCell, styles.headerCell]}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Text>
        </>
      ))}
    </View>
  );
  const renderTableRow = (record) => (
    <View style={styles.tableRow}>
      {console.log(record?.time)}

      <>
        {Object.values(record).map((value, index) => (
          <>
            <Text key={index} style={[styles.tableCell, { width: width(5) }]}>
              {value}
            </Text>
          </>
        ))}
      </>
    </View>
  );
  const renderCategory = (category, records) => (
    <View key={category} style={styles.categoryContainer}>
      {records.length > 0 && (
        <View>
          <Text style={styles.categoryHeader}>{category}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View>
              {/* <View> */}
              {renderTableHeader(Object.keys(records[0]))}
              {records.map((record, index) => (
                <>{renderTableRow(record)}</>
              ))}
              {/* </View> */}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
  return (
    <ScreenWrapper
      backgroundColor={AppColors.white}
      statusBarColor={AppColors.primary}
      barStyle="dark-content"
      scrollEnabled={false}
    >
      <Header
        showLeft={true}
        showBack
        title="Search"
        onBackPress={() => navigation?.goBack()}
      />
      <View style={{ flexGrow: 1 }}>
        <Spacer vertical={height(2)} />
        <InputField
          control={control}
          onSubmit={handleSubmit(filterDataById)}
          prefix={
            <AntDesign
              name="search1"
              color={AppColors.black}
              size={height(2)}
              style={{ marginRight: height(1) }}
            />
          }
          name="search"
          keyboardType="email-address"
          containerStyles={{
            width: "90%",
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
          placeholder="Search..."
          error={errors.search}
        />
        {!found ? (
          <CustomText
            children={error}
            size={2}
            textAlign="center"
            color={AppColors.black}
          />
        ) : (
          <View
            style={{
              paddingHorizontal: height(2.5),
              marginTop: height(1),
              flex: 1,
              paddingBottom: height(2.5),
            }}
          >
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <CustomText
                children={"Details:"}
                size={3}
                textAlign="left"
                textStyles={{ fontWeight: "bold" }}
                color={AppColors.black}
              />
              {found?.length > 10 &&
                Object.entries(found).map(([category, records]) => (
                  <View key={category}>
                    {/* <Text style={styles.title}>{category}</Text>
                     */}
                    {category !== "todos" && (
                      <>
                        <CustomText
                          children={`${category}:`}
                          size={2}
                          textAlign="left"
                          textStyles={{
                            fontWeight: "bold",
                            marginTop: height(1),
                          }}
                          color={AppColors.black}
                        />
                        {records.length > 0 ? (
                          records.map((record, index) => (
                            <View key={index} style={styles.recordContainer}>
                              {Object.entries(record).map(([key, value]) =>
                                renderDetail(key, value)
                              )}
                            </View>
                          ))
                        ) : (
                          <Text style={styles.noRecords}>No records found</Text>
                        )}
                      </>
                    )}
                  </View>
                ))}

              {found && (
                <>
                  {Object.entries(found).map(([category, records]) =>
                    renderCategory(category, records)
                  )}
                </>
              )}
            </ScrollView>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}
{
  /* <View
style={{
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex=start",
  borderBottomColor: AppColors.black,
  borderBottomWidth: 1,
  marginTop: height(1),
  paddingVertical: height(0.5),
}}
>
<CustomText
  children={"Id:"}
  size={2}
  textAlign="left"
  textStyles={{ fontWeight: "500" }}
  color={AppColors.black}
/>
<CustomText
  children={found?.id}
  size={2}
  textAlign="left"
  textStyles={{ fontWeight: "600" }}
  color={AppColors.black}
/>
</View>
<View
style={{
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex=start",
  borderBottomColor: AppColors.black,
  borderBottomWidth: 1,
  marginTop: height(1),
  paddingVertical: height(0.5),
}}
>
<CustomText
  children={"Breed:"}
  size={2}
  textAlign="left"
  textStyles={{ fontWeight: "500" }}
  color={AppColors.black}
/>
<CustomText
  children={found?.breed}
  size={2}
  textAlign="left"
  textStyles={{ fontWeight: "600" }}
  color={AppColors.black}
/>
</View>
<View
style={{
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex=start",
  borderBottomColor: AppColors.black,
  borderBottomWidth: 1,
  marginTop: height(1),
  paddingVertical: height(0.5),
}}
>
<CustomText
  children={"Gender:"}
  size={2}
  textAlign="left"
  textStyles={{ fontWeight: "500" }}
  color={AppColors.black}
/>
<CustomText
  children={found?.gender}
  size={2}
  textAlign="left"
  textStyles={{ fontWeight: "600" }}
  color={AppColors.black}
/>
</View>
<View
style={{
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex=start",
  borderBottomColor: AppColors.black,
  borderBottomWidth: 1,
  marginTop: height(1),
  paddingVertical: height(0.5),
}}
>
<CustomText
  children={"Calving:"}
  size={2}
  textAlign="left"
  textStyles={{ fontWeight: "500" }}
  color={AppColors.black}
/>
<CustomText
  children={found?.calving}
  size={2}
  textAlign="left"
  textStyles={{ fontWeight: "600" }}
  color={AppColors.black}
/>
</View>
<View
style={{
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex=start",
  borderBottomColor: AppColors.black,
  borderBottomWidth: 1,
  marginTop: height(1),
  paddingVertical: height(0.5),
}}
>
<CustomText
  children={"Date of Birth:"}
  size={2}
  textAlign="left"
  textStyles={{ fontWeight: "500" }}
  color={AppColors.black}
/>
<CustomText
  children={found?.dob}
  size={2}
  textAlign="left"
  textStyles={{ fontWeight: "600" }}
  color={AppColors.black}
/>
</View>
<View
style={{
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex=start",
  borderBottomColor: AppColors.black,
  borderBottomWidth: 1,
  marginTop: height(1),
  paddingVertical: height(0.5),
}}
>
<CustomText
  children={"Size:"}
  size={2}
  textAlign="left"
  textStyles={{ fontWeight: "500" }}
  color={AppColors.black}
/>
<CustomText
  children={found?.size}
  size={2}
  textAlign="left"
  textStyles={{ fontWeight: "600" }}
  color={AppColors.black}
/>
</View>
<View
style={{
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex=start",
  borderBottomColor: AppColors.black,
  borderBottomWidth: 1,
  marginTop: height(1),
  paddingVertical: height(0.5),
}}
>
<CustomText
  children={"Birth Weight:"}
  size={2}
  textAlign="left"
  textStyles={{ fontWeight: "500" }}
  color={AppColors.black}
/>
<CustomText
  children={`${found?.birthWeight} Kg`}
  size={2}
  textAlign="left"
  textStyles={{ fontWeight: "600" }}
  color={AppColors.black}
/>
</View>
<View
style={{
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex=start",
  borderBottomColor: AppColors.black,
  borderBottomWidth: 1,
  marginTop: height(1),
  paddingVertical: height(0.5),
}}
>
<CustomText
  children={"Vigour"}
  size={2}
  textAlign="left"
  textStyles={{ fontWeight: "500" }}
  color={AppColors.black}
/>
<CustomText
  children={found?.vigour}
  size={2}
  textAlign="left"
  textStyles={{ fontWeight: "600" }}
  color={AppColors.black}
/>
</View>
<View
style={{
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex=start",
  borderBottomColor: AppColors.black,
  borderBottomWidth: 1,
  marginTop: height(1),
  paddingVertical: height(0.5),
  flexGrow: 1,
}}
>
<CustomText
  children={"Comment:"}
  size={2}
  // textAlign="left"
  textStyles={{ fontWeight: "500" }}
  color={AppColors.black}
/>
<CustomText
  children={found?.Comment}
  textAlign="left"
  size={2}
  textStyles={{
    // fontWeight: "00",
    // flex: 1,
    width: "80%",
    alignSelf: "flex-end",
    marginHorizontal: height(0.5),
  }}
  color={AppColors.black}
/>
</View> */
}
