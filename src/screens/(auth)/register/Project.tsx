import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useForm, Controller, SubmitErrorHandler } from "react-hook-form";
import { useLinkTo } from "@react-navigation/native";
import BackPageButton from "../../../components/buttons/backPageButton";
import ButtonTwo from "../../../components/buttons/buttonTwo";
import axios from "axios";
import { storeData } from "../../../utils/storage";
import { unauthorizedAPI } from "../../../utils/api";

interface FormData {
  name: string;
  location: string;
  description: string;
}

const Project: React.FC = () => {
  const linkTo = useLinkTo();
  const [loading, setLoading] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    // setLoading(true);
    // try {
    //   const response = await unauthorizedAPI.post(`/auth/register`, data);
    //   const { access_token, refresh_token, user } = response.data;
    //   await Promise.all([
    //     storeData("token", access_token),
    //     storeData("token2", refresh_token),
    //     storeData("user", user),
    //   ]);
    //   linkTo("/addaddress");
    // } catch (error) {
    //   console.error("Error posting data:", error);
    // }
    // setLoading(false);
    linkTo("/finish")
  };

  const onError: SubmitErrorHandler<FormData> = (errors, e) => {
    return console.log(errors);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        style={styles.imageBackground}
        source={require("../../../assets/authBg.png")}
      />
      <StatusBar translucent backgroundColor={"transparent"} />
      <View style={styles.headerContainer}>
        <BackPageButton />
        {/* <Text style={styles.headerText}>Create Account</Text> */}
      </View>
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.pageHeader}>Project Information</Text>
          <View style={styles.imageContainer}>
            <Image source={require("../../../assets/stepper2.png")} />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Project Name</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  keyboardType="default"
                  style={styles.input}
                  placeholder="ex: Fosec"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="name"
              rules={{ required: "You must enter project name" }}
            />
          </View>
          <View style={styles.formField}>
            <Text style={styles.label}>Current Location</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="ex: Nyabihu"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="location"
              rules={{
                required: "You must enter your current Location",
              }}
            />
          </View>
          <View style={styles.formField}>
            <Text style={styles.label}>Description of the project</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Enter your description here"
                  style={[styles.input]}
                  multiline={true} // Enable multiline
                  numberOfLines={4} // Specify number of lines
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="description"
              rules={{ required: "You must enter a description" }}
            />
          </View>
          <View style={styles.submitButtonContainer}>
            <ButtonTwo
              name="NEXT"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
            />
          </View>
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <Pressable onPress={() => linkTo("/login")}>
            <Text style={styles.loginLink}>Login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EFFFEF",
  },
  imageBackground: {
    position: "absolute",
    // height: 600,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 40,
    paddingLeft: 20,
    marginBottom: 40,
  },
  headerText: {
    color: "#fff",
    fontSize: 37,
    marginTop: 20,
    fontWeight: "bold",
  },
  pageHeader: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "white",
    margin: 10,
    marginTop:10,
    borderRadius: 15,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  formField: {
    marginTop: 20,
  },
  label: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    backgroundColor: "#fff",
    marginTop: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  submitButtonContainer: {
    marginTop: 30,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "white",
    margin: 15,
    borderRadius: 15,
  },
  loginText: {
    color: "#333",
    fontSize: 18,
    textAlign: "center",
  },
  loginLink: {
    color: "#34A853",
    fontSize: 18,
    marginLeft: 5,
  },
  socialLoginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  socialLoginDivider: {
    height: 1,
    backgroundColor: "#B3B3B3",
    width: "30%",
  },
  socialLoginText: {
    color: "#333",
    fontSize: 16,
    marginHorizontal: 10,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    marginLeft: 5,
  },
});

export default Project;
