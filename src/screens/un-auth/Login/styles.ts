import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useStyleLogin = () => {
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        logo: {
          width: 200,
          height: 100,
          alignSelf: 'center',
          marginBottom: 32,
        },
        buttonFP: {
          alignSelf: 'flex-end'
        }
      }),
    []
  );
};
