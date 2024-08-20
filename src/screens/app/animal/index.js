import { View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/screen-wrapper";
import { AppColors } from "../../../utils";
import Header from "../../../components/header";
import CustomText from "../../../components/text";
import { height } from "../../../utils/dimension";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import Spacer from "../../../components/spacer";
import BirthEventModal from "../../../components/birth-event-modal";
import CalfInfoModal from "../../../components/calf-info-modal";
import CowInfoModal from "../../../components/cow-info-modal";
import WeightModal from "../../../components/weight-modal";
import BreedingModal from "../../../components/breeding-modal";
import RemediesModal from "../../../components/remedies-modal";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../Redux/Actions/Auth";
import Toast from "react-native-toast-message";
import { ScreenNames } from "../../../Routes/routes";
import { firestore } from "../../../../firebaseconfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function AnimalScreen({ navigation }) {
  const dispatch = useDispatch();
  // const usersCollection = firestore().collection("DevelopmentUsers");
  const usersCollection = (firestore, "DevelopmentUsers");
  const user = useSelector((state) => state?.Auth?.user);
  const [birthEvents, setBirthEvents] = useState(user?.birthEvents ?? []);
  const [cowInfo, setCowInfo] = useState(user?.cowInfo ?? []);
  const [calfInfo, setCalfInfo] = useState(user?.calfInfos ?? []);
  const [weightInfo, setWeightInfo] = useState(user?.weightInfos ?? []);
  const [breeding, setBreeding] = useState(user?.breedInfos ?? []);
  const [remediesInfo, setRemediesInfo] = useState(user?.remedies ?? []);
  const [birth, setBirth] = useState(false);
  const [cow, setCow] = useState(false);
  const [calf, setCalf] = useState(false);
  const [weight, setWeight] = useState(false);
  const [breed, setBreed] = useState(false);
  const [remedies, setRemedies] = useState(false);
  useEffect(() => {
    setBirthEvents(user?.birthEvents ?? []);
    setCowInfo(user?.cowInfo ?? []);
    setCalfInfo(user?.calfInfos ?? []);

    setWeightInfo(user?.weightInfos ?? []);
    setBreeding(user?.breedInfos ?? []);
    setRemediesInfo(user?.remedies ?? []);
  }, [user]);
  const data = [
    {
      id: 1,
      name: "Birth Events",
      suffix: "birthEvents",
    },
    {
      id: 2,
      name: "Calf Information",
      suffix: "calfInfos",
    },
    {
      id: 3,
      name: "Cow Information",
      suffix: "cowInfos",
    },
    {
      id: 4,
      name: "Weighing",
      suffix: "weightInfos",
    },
    {
      id: 5,
      name: "Breeding",
      suffix: "breedInfos",
    },
    {
      id: 6,
      name: "Remedies",
      suffix: "remedies",
    },
  ];
  const handleSelection = async (index) => {
    switch (index) {
      case 0:
        setBirth(true);

        break;
      case 1:
        setCalf(true);

        break;
      case 2:
        setCow(true);

        break;
      case 3:
        setWeight(true);

        break;
      case 4:
        setBreed(true);

        break;
      case 5:
        setRemedies(true);

        break;
      case 1:
        setBirth(true);

        break;
      default:
        break;
    }
  };
  const _renderItem = ({ item, index }) => {
    return (
      <Pressable
        key={index}
        style={styles?.textCard}
        onPress={() => {
          navigation?.navigate(ScreenNames.ANIMAL_DETAILS_SCREEN, {
            title: item?.name,
            suffix: item?.suffix,
          });
        }}
      >
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
        <Pressable onPress={() => handleSelection(index)}>
          <AntDesign name="plus" size={height(2)} color={AppColors.primary} />
        </Pressable>
      </Pressable>
    );
  };
  function filterDataById(id) {
    const filteredData = {};
    let isExists = false;
    for (const key in user) {
      if (Array.isArray(user[key])) {
        filteredData[key] = user[key].filter((item) => item.id === id);
        console.log(filteredData[key]);
        if (filteredData[key]?.length > 0) {
          isExists = true;
          break;
        }
      }
    }

    return isExists;
  }
  const handleBirthEvents = async (values) => {
    console.log(values);
    // const isExists = birthEvents?.filter((item) => item.id === values?.id);

    const isExists = false;
    if (isExists === true) {
      alert("Event with this id already exists");
      return;
    } else {
      const body = {
        ...values,
      };
      updateDoc(doc(firestore, "DevelopmentUsers", user?.email), {
        birthEvents: [...birthEvents, body],
      });
      // usersCollection.doc(user?.email).update({
      //   birthEvents: [...birthEvents, body],
      // });
      console.log("handleBirthEvents", values);
      const docRef = doc(firestore, "DevelopmentUsers", user?.email);
      const userDoc = await getDoc(docRef).then((res) => {
        dispatch(login(res.data()));
      });
      // if (userDoc) {
      //   dispatch(login(userDoc));
      // }
      Toast.show({
        text1: "Record Added",
        type: "error",
        text2: "Birth event added successfully",
      });
    }
  };

  const handleCalfInfo = async (values) => {
    const isExists = false;
    if (isExists === true) {
      alert("Calf info with this id already exists");
      return;
    } else {
      const body = {
        ...values,
      };

      updateDoc(doc(firestore, "DevelopmentUsers", user?.email), {
        calfInfos: [...calfInfo, body],
      });
      console.log("handleBirthEvents", values);
      const docRef = doc(firestore, "DevelopmentUsers", user?.email);
      const userDoc = await getDoc(docRef).then((res) => {
        dispatch(login(res.data()));
      });
      // usersCollection.doc(user?.email).update({
      //   calfInfos: [...calfInfo, body],
      // });
      // console.log("handleCalfInfo", values);
      // let res;
      // res = await usersCollection.doc(user?.email).get();
      // if (res?.exists) {
      //   dispatch(login(res.data()));
      // }
      Toast.show({
        text1: "Record Added",
        type: "error",
        text2: "Calf info added successfully",
      });
    }
  };
  const handleCowInfo = async (values) => {
    const isExists = false;
    if (isExists === true) {
      alert("Cow info with this id already exists");
      return;
    } else {
      const body = {
        ...values,
      };
      updateDoc(doc(firestore, "DevelopmentUsers", user?.email), {
        cowInfos: [...cowInfo, body],
      });
      console.log("handleBirthEvents", values);
      const docRef = doc(firestore, "DevelopmentUsers", user?.email);
      const userDoc = await getDoc(docRef).then((res) => {
        dispatch(login(res.data()));
      });
      // usersCollection.doc(user?.email).update({
      //   cowInfos: [...cowInfo, body],
      // });
      // console.log("handleCowInfo", values);
      // let res;
      // res = await usersCollection.doc(user?.email).get();
      // if (res?.exists) {
      //   dispatch(login(res.data()));
      // }
      Toast.show({
        text1: "Record Added",
        type: "error",
        text2: "Cow info added successfully",
      });
    }
  };
  const handleWightInfo = async (values) => {
    const isExists = false;
    if (isExists === true) {
      alert("Weighing Info with this id already exists");
      return;
    } else {
      const body = {
        ...values,
      };
      updateDoc(doc(firestore, "DevelopmentUsers", user?.email), {
        weightInfos: [...weightInfo, body],
      });
      console.log("handleBirthEvents", values);
      const docRef = doc(firestore, "DevelopmentUsers", user?.email);
      const userDoc = await getDoc(docRef).then((res) => {
        dispatch(login(res.data()));
      });
      // usersCollection.doc(user?.email).update({
      //   weightInfos: [...weightInfo, body],
      // });
      // console.log("handleWightInfo", values);
      // let res;
      // res = await usersCollection.doc(user?.email).get();
      // if (res?.exists) {
      //   dispatch(login(res.data()));
      // }
      Toast.show({
        text1: "Record Added",
        type: "error",
        text2: "Weighing info added successfully",
      });
    }
  };
  const handleBreedInfo = async (values) => {
    const isExists = false;
    if (isExists === true) {
      alert("Breed with this id already exists");
      return;
    } else {
      const body = {
        ...values,
      };
      updateDoc(doc(firestore, "DevelopmentUsers", user?.email), {
        breedInfos: [...breeding, body],
      });
      console.log("handleBirthEvents", values);
      const docRef = doc(firestore, "DevelopmentUsers", user?.email);
      const userDoc = await getDoc(docRef).then((res) => {
        dispatch(login(res.data()));
      });
      // usersCollection.doc(user?.email).update({
      //   breedInfos: [...breeding, body],
      // });
      // console.log("handleBreedInfo", values);
      // let res;
      // res = await usersCollection.doc(user?.email).get();
      // if (res?.exists) {
      //   dispatch(login(res.data()));
      // }
      Toast.show({
        text1: "Record Added",
        type: "error",
        text2: "Breed info added successfully",
      });
    }
  };
  const handleRemedies = async (values) => {
    const isExists = false;
    if (isExists === true) {
      alert("Remedies with this id already exists");
      return;
    } else {
      const body = {
        ...values,
      };
      updateDoc(doc(firestore, "DevelopmentUsers", user?.email), {
        remedies: [...remediesInfo, body],
      });
      console.log("handleBirthEvents", values);
      const docRef = doc(firestore, "DevelopmentUsers", user?.email);
      const userDoc = await getDoc(docRef).then((res) => {
        dispatch(login(res.data()));
      });
      // usersCollection.doc(user?.email).update({
      //   remedies: [...remediesInfo, body],
      // });
      // console.log("handleRemedies", values);
      // let res;
      // res = await usersCollection.doc(user?.email).get();
      // if (res?.exists) {
      //   dispatch(login(res.data()));
      // }
      Toast.show({
        text1: "Record Added",
        type: "error",
        text2: "Remedies added successfully",
      });
    }
  };

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
        <BirthEventModal
          visible={birth}
          onClose={(value) => {
            setBirth(false);
          }}
          onPress={(value) => {
            handleBirthEvents(value);
            setBirth(false);
          }}
          primaryText={"Add Birth Event"}
          buttonText={"Add"}
          buttonTextStyle={{ fontSize: height(2), fontWeight: "bold" }}
          buttonStyle={{ width: "100%", paddingVertical: height(1) }}
        />
        <CalfInfoModal
          visible={calf}
          onClose={() => {
            setCalf(false);
          }}
          onPress={(value) => {
            handleCalfInfo(value);
            setCalf(false);
          }}
          primaryText={"Add Calf Info"}
          buttonText={"Add"}
          buttonTextStyle={{ fontSize: height(2), fontWeight: "bold" }}
          buttonStyle={{ width: "100%", paddingVertical: height(1) }}
        />
        <CowInfoModal
          visible={cow}
          onClose={() => {
            setCow(false);
          }}
          onPress={(value) => {
            handleCowInfo(value);
            setCow(false);
          }}
          primaryText={"Add Cow Info"}
          buttonText={"Add"}
          buttonTextStyle={{ fontSize: height(2), fontWeight: "bold" }}
          buttonStyle={{ width: "100%", paddingVertical: height(1) }}
        />
        <WeightModal
          visible={weight}
          onClose={() => {
            setWeight(false);
          }}
          onPress={(value) => {
            handleWightInfo(value);
            setWeight(false);
          }}
          primaryText={"Add Weighing"}
          buttonText={"Add"}
          buttonTextStyle={{ fontSize: height(2), fontWeight: "bold" }}
          buttonStyle={{ width: "100%", paddingVertical: height(1) }}
          containerStyle={{ height: "auto", paddingVertical: height(1) }}
        />
        <BreedingModal
          visible={breed}
          onClose={() => {
            setBreed(false);
          }}
          onPress={(value) => {
            handleBreedInfo(value);
            setBreed(false);
          }}
          primaryText={"Add Breeding"}
          buttonText={"Add"}
          buttonTextStyle={{ fontSize: height(2), fontWeight: "bold" }}
          buttonStyle={{ width: "100%", paddingVertical: height(1) }}
          containerStyle={{ height: height(50), paddingVertical: height(1) }}
        />
        <RemediesModal
          visible={remedies}
          onClose={() => {
            setRemedies(false);
          }}
          onPress={(value) => {
            handleRemedies(value);
            setRemedies(false);
          }}
          primaryText={"Add Remedies"}
          buttonText={"Add"}
          buttonTextStyle={{ fontSize: height(2), fontWeight: "bold" }}
          buttonStyle={{ width: "100%", paddingVertical: height(1) }}
          containerStyle={{ height: height(50), paddingVertical: height(1) }}
        />
      </View>
    </ScreenWrapper>
  );
}
