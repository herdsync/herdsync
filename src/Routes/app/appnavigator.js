import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenNames } from "../routes";
import TODOScreen from "../../screens/app/todo";
import HomeScreen from "../../screens/app/home";
import AnimalScreen from "../../screens/app/animal";
import LAND_SCREEN from "../../screens/app/land";
import SearchScreen from "../../screens/app/search";
import SettingsScreen from "../../screens/app/settings";
import AnimalDetailsScreen from "../../screens/app/animal-details";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  //   const dispatch = useDispatch()

  //   const hasCompletedProfile = useSelector(selectHasCompletedProfile)
  //   const hasDocumentUploaded = useSelector(selectHasDocumentUploaded)
  //   const isLoggedIn = useSelector(selectIsLoggedIn)

  //   const getRouteName = () => {
  //     if (!isLoggedIn) {
  //       return ScreenNames.SELECT_ROLE
  //     }
  //     if (!hasDocumentUploaded) {
  //       return ScreenNames.DOCUMENT_VERIFICATION
  //     } else if (!hasCompletedProfile) {
  //       return ScreenNames.COMPLETE_PROFILE
  //     } else {
  //       return ScreenNames.SELECT_ROLE
  //     }
  //   }

  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.HOME}
      screenOptions={{ header: () => false }}
    >
      <Stack.Screen name={ScreenNames.HOME} component={HomeScreen} />
      <Stack.Screen name={ScreenNames.TODO} component={TODOScreen} />
      <Stack.Screen name={ScreenNames.ANIMAL} component={AnimalScreen} />
      <Stack.Screen name={ScreenNames.LAND} component={LAND_SCREEN} />
      <Stack.Screen name={ScreenNames.SEARCH} component={SearchScreen} />
      <Stack.Screen name={ScreenNames.SETTINGS} component={SettingsScreen} />
      <Stack.Screen
        name={ScreenNames.ANIMAL_DETAILS_SCREEN}
        component={AnimalDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
