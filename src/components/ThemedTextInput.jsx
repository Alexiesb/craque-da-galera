import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const ThemedTextInput = (props) => {
  return (
    <TextInput
      style={styles.input}
      mode="outlined"
      outlineColor="#97c5b4"
      activeOutlineColor="#016fbe"
      textColor="#01518b"
      theme={{
        colors: {
          onSurfaceVariant: '#589e85',
          primary: '#016fbe',
        },
      }}
      {...props} // Pass all other props down to the TextInput
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
});

export default ThemedTextInput;