import { View, Text, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/screen-wrapper";
import { AppColors } from "../../../utils";
import Header from "../../../components/header";
import CustomText, { SmallText } from "../../../components/text";
import Button from "../../../components/button";
import { height, width } from "../../../utils/dimension";
import styles from "./styles";
import TodoModal from "../../../components/todo-modal";
import { AntDesign } from "@expo/vector-icons";
import Spacer from "../../../components/spacer";
// import firestore from "@react-native-firebase/firestore";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../../firebaseconfig";
import { login } from "../../../Redux/Actions/Auth";

export default function TODOScreen({ navigation }) {
  const user = useSelector((state) => state?.Auth?.user);
  const [todos, setTodos] = React.useState(user?.todos ?? []);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setIndex] = useState();
  const [selectedItem, setSelectedItem] = useState();
  // const usersCollection = firestore().collection("DevelopmentUsers");
  const [isLoading, setIsLoading] = useState(false);

  const handleTodo = async (values) => {
    setIsLoading(true);
    try {
      const body = {
        ...values,
        id: new Date().getTime(),
        isCompleted: false,
        time: new Date().toISOString(),
      };
      setTodos([...todos, body]);
      // usersCollection.doc(user?.email).update({
      //   todos: [...todos, body],
      // });
      updateDoc(doc(firestore, "DevelopmentUsers", user?.email), {
        todos: [...todos, body],
      });
      // usersCollection.doc(user?.email).update({
      //   birthEvents: [...birthEvents, body],
      // });
      const docRef = doc(firestore, "DevelopmentUsers", user?.email);
      const userDoc = await getDoc(docRef).then((res) => {
        dispatch(login(res.data()));
      });
      setIsLoading(false);
      setModalVisible(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const updateTodos = (values) => {
    setIsLoading(true);
    try {
      const updatedTodo = {
        ...todos[selectedIndex],
        ...values,
      };
      const updatedTodos = todos.map((todo, index) =>
        index === selectedIndex ? updatedTodo : todo
      );
      setTodos(updatedTodos);
      // usersCollection.doc(user?.email).update({
      //   todos: updatedTodos,
      // });
      updateDoc(doc(firestore, "DevelopmentUsers", user?.email), {
        todos: updatedTodos,
      });
      // usersCollection.doc(user?.email).update({
      //   birthEvents: [...birthEvents, body],
      // });
      const docRef = doc(firestore, "DevelopmentUsers", user?.email);
      const userDoc = getDoc(docRef).then((res) => {
        dispatch(login(res.data()));
      });
      setIndex();
      setSelectedItem();
      setIsLoading(false);
      setModalVisible(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteTodo = (index) => {
    const temp = [...todos];
    temp.splice(index, 1);
    setTodos(temp);
    // usersCollection.doc(user?.email).update({
    //   todos: temp,
    // });
    updateDoc(doc(firestore, "DevelopmentUsers", user?.email), {
      ttodos: temp,
    });
    // usersCollection.doc(user?.email).update({
    //   birthEvents: [...birthEvents, body],
    // });
    const docRef = doc(firestore, "DevelopmentUsers", user?.email);
    const userDoc = getDoc(docRef).then((res) => {
      dispatch(login(res.data()));
    });
    setSelectedItem();
    setModalVisible(false);
  };
  function onClose() {
    setModalVisible(false);
  }

  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          marginVertical: height(1),
          width: "98%",
          alignSelf: "center",
          borderRadius: width(2),
          borderWidth: width(0.5),
          borderColor: AppColors.black,
          paddingHorizontal: width(1),
          paddingVertical: height(1),
          borderRadius: width(2),
          backgroundColor: AppColors.white,
        }}
      >
        <CustomText size={3}>{item.title}</CustomText>
        <Spacer vertical={height(1)} />
        <CustomText size={1.5} color={AppColors.secondary}>
          {item.description}
        </CustomText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "14%",
            alignSelf: "flex-end",
          }}
        >
          <Pressable
            onPress={() => {
              setIndex(index);
              setSelectedItem(item);
              setModalVisible(true);
            }}
          >
            <AntDesign name="edit" size={height(2.5)} color={AppColors.black} />
          </Pressable>
          <Pressable
            onPress={() => {
              deleteTodo(index);
            }}
          >
            <AntDesign
              name="delete"
              size={height(2.5)}
              color={AppColors.black}
            />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper
      backgroundColor={AppColors.white}
      statusBarColor={AppColors.primary}
      barStyle="dark-content"
    >
      <Header
        showLeft
        showBack
        onBackPress={() => navigation?.goBack()}
        title="ToDo"
      />
      <View style={{ flex: 1, marginBottom: height(10) }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={todos}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={_renderItem}
        />
      </View>
      <Button
        children={"Add Todo"}
        onPress={() => {
          setModalVisible(true);
        }}
        containerStyle={styles.button}
        size={3}
        textStyle={{ fontWeight: "bold" }}
      />
      <TodoModal
        loading={isLoading}
        isVisible={modalVisible}
        onPress={(values) => {
          if (selectedItem) {
            updateTodos(values);
          } else {
            handleTodo(values);
          }
        }}
        selectedItem={selectedItem}
        onClose={() => onClose()}
      />
    </ScreenWrapper>
  );
}
