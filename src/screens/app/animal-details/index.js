import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/screen-wrapper";
import { AppColors } from "../../../utils";
import Header from "../../../components/header";
import CustomText from "../../../components/text";
import { height, width } from "../../../utils/dimension";
import styles from "./styles";
import Spacer from "../../../components/spacer";

import { useSelector } from "react-redux";

export default function AnimalDetailsScreen({ navigation, route }) {
  const user = useSelector((state) => state?.Auth?.user);
  const Title = route?.params?.title;
  const suffix = route?.params?.suffix;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (suffix) {
      setData(user[suffix] ?? []);
    }
  }, [user, suffix]);

  const renderTableHeader = (keys) => (
    <View style={styles.tableRow}>
      {keys.map(
        (key) => (
          <Text
            key={key}
            style={[
              styles.tableCell,
              styles.headerCell,
              { minWidth: key === "Comment" ? 250 : 150 },
            ]}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Text>
        )
        // )
      )}
    </View>
  );

  const renderTableRow = (record) => (
    <View style={styles.tableRow}>
      {Object.entries(record).map(
        ([key, value], index) => (
          // key !== "Comment" && (
          <Text
            key={index}
            style={[
              styles.tableCell,
              { width: width(5), minWidth: key === "Comment" ? 250 : 150 },
            ]}
          >
            {value}
          </Text>
        )
        // )
      )}
    </View>
  );

  const renderCategory = (category, records) => (
    <View key={category} style={styles.categoryContainer}>
      {records.length > 0 && (
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View>
              {renderTableHeader(Object.keys(records[0]))}
              {records.map((record, index) => (
                <View key={index}>{renderTableRow(record)}</View>
              ))}
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
        title={Title}
        onBackPress={() => navigation?.goBack()}
      />
      <View style={{ flexGrow: 1, paddingHorizontal: width(2) }}>
        <Spacer vertical={height(5)} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {data.length > 0 ? (
            renderCategory(suffix, data)
          ) : (
            <CustomText
              children={"No Data right now"}
              size={2}
              color={AppColors.black}
            />
          )}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
