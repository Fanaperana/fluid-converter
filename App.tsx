import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { styled } from "nativewind";

const TwText = styled(Text);
const TwView = styled(View);
const TwInput = styled(TextInput);
const TwModal = styled(Modal);
const TwPressable = styled(Pressable);

export default function App() {
  const K = 1.043176;
  const [temperature, setTemperature] = useState("200");
  const [density, setDensity] = useState("");
  const [ounce, setOunce] = useState("0");
  const [flOunce, setFlOunce] = useState("0");
  const [modalVisible, setModalVisible] = useState(false);

  const getWaterDensity = (temperatureFahrenheit: number) => {
    const densityOuncesPerCubicInch =
      (1 / 231) * (62.4 + 0.376 * temperatureFahrenheit);
    const densityGramsPerCubicCm = densityOuncesPerCubicInch * 1.733;
    return densityGramsPerCubicCm;
  };

  const toOunce = (_fluidOunceValue: number) => {
    return _fluidOunceValue * K * Number(density);
  };

  const toFluidOunce = (_ounceValue: number) => {
    return _ounceValue / (K * Number(density));
  };

  const handleTemperature = (_tempvalue: string) => {
    setTemperature(_tempvalue);
    const t = Number(_tempvalue);
    const d = getWaterDensity(t).toFixed(1).toString();
    setDensity(d);
  };

  useEffect(() => {
    handleFlOunce(flOunce);
    handleOunce(ounce);
  }, [temperature]);

  /**
   *
   * @param _ounce : get ounce value and convert by populating flOunce
   */
  const handleOunce = (_ounce: string) => {
    setOunce(_ounce);
    const newVal = Number(_ounce);
    if (newVal === 0) {
      setFlOunce(`${newVal.toFixed(4)}`);
      return;
    }
    const converted_fl_ounce = toFluidOunce(newVal).toFixed(4);
    setFlOunce(converted_fl_ounce.toString());
    return;
  };

  /**
   *
   * @param _fl_ounce : get fl_ounce value and convert by populating flOunce
   */
  const handleFlOunce = (_fl_ounce: string) => {
    setFlOunce(_fl_ounce);
    const newVal = Number(_fl_ounce);
    const converted_ounce = toOunce(newVal).toFixed(4);
    setOunce(converted_ounce.toString());
  };

  useEffect(() => {
    const d = getWaterDensity(parseFloat(temperature));
    setDensity(d.toFixed(1).toString());
    handleOunce(`0`);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TwView className="flex-1 justify-center items-center bg-slate-700 relative">
          <TwModal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <TwView className="flex-1 justify-center items-center">
              <TwView className="w-[310px] h-[100px] bg-white  rounded-lg border flex justify-center items-center p-5 gap-2 relative">
                <TwView className="grow pb-5">
                  <TwView className="flex flex-row justify-center items-center">
                    <TwView className="">
                      <TwText className="italic">fluid ounces =</TwText>
                    </TwView>
                    <TwView>
                      <TwText className="italic border-b text-center">
                        ounces
                      </TwText>
                      <TwText className="italic text-center text-xs">
                        1.043176 × ingredient density
                      </TwText>
                    </TwView>
                  </TwView>
                </TwView>
                <TwPressable
                  className="bg-red-700 p-2 rounded absolute -bottom-1/3 w-[100px]"
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <TwText className="text-slate-200 font-bold text-center">
                    Close
                  </TwText>
                </TwPressable>
              </TwView>
            </TwView>
          </TwModal>

          <TwText className="font-bold text-[35px] text-center text-orange-400 mb-5">
            Fluid Converter
          </TwText>

          <TwView className="w-[340px] text-left p-4 bg-slate-800 mb-3 rounded border border-yellow-800 relative">
            <TwView className="w-[340px] text-left flex flex-row justify-start items-center mb-2 gap-2 relative">
              <TwText className="text-bold text-white text-xl">
                Temperature:
              </TwText>
              <TwInput
                className="text-right border border-yellow-500/50 w-[100px] px-2 text-xl font-bold text-slate-100 bg-slate-600 rounded pb-1"
                value={temperature}
                inputMode="decimal"
                onChangeText={handleTemperature}
              />
              <TwText className="text-bold text-white text-xl bg-slate-900 py-1 px-2 rounded-md">
                ° F
              </TwText>
            </TwView>
            <TwView className="flex flex-row">
              <TwText className="text-bold text-white text-xl grow">
                Density: {density}
              </TwText>
            </TwView>

            <TwPressable
              className="absolute -top-2 -right-2 px-2 py-0 bg-slate-600 rounded-full border border-slate-400"
              onPress={() => setModalVisible(true)}
            >
              <TwText className="text-slate-200 font-bold text-center">
                !
              </TwText>
            </TwPressable>
          </TwView>

          <TwView className="w-[340px] relative">
            <TwInput
              className="w-full text-left border border-slate-400 pb-2 pt-4 pl-3 pr-5 my-2 rounded-md text-slate-300 block text-2xl mb-4"
              inputMode="decimal"
              value={ounce}
              onChangeText={handleOunce}
            />
            <TwText className="absolute right-0 -top-2 text-slate-200 font-bold text-xl bg-slate-700 px-1">
              oz
            </TwText>
          </TwView>
          <TwView className="w-[340px] relative">
            <TwInput
              className="w-full text-left border border-slate-400 pb-2 pt-4 pl-3 pr-5 my-2 rounded-md text-slate-300 block text-2xl"
              inputMode="decimal"
              value={flOunce}
              onChangeText={handleFlOunce}
            />
            <TwText className="absolute right-0 -top-2 text-slate-200 font-bold text-xl bg-slate-700 px-1">
              fl oz
            </TwText>
          </TwView>
          <StatusBar style="auto" />
        </TwView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});
