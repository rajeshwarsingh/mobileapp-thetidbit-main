import React from "react";
import { Modal, Text, View, ActivityIndicator, Dimensions } from "react-native";
import { Colors, Default, Fonts } from "../constants/style";
import { useTranslation } from "react-i18next";
import PlusLoader from './PlusLoader';

const { width } = Dimensions.get("window");

const Loader = (props) => {
  const { t } = useTranslation();

  function tr(key) {
    return t(`loader:${key}`);
  }

  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <PlusLoader/>
    </Modal>
  );
};
export default Loader;