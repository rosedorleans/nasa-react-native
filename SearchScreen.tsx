
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
});

type SearchType = z.infer<typeof schema>;

export default function SearchScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SearchType>({
    defaultValues: {
      firstName: "",
    },
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: SearchType) => {
    console.log(">>> ", data);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Lorem ipsum</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />

      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      {errors.lastName && <Text>This is required.</Text>}

      <Button
        title="Valider"
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    height: 50,
    margin: 16,
    borderColor: "#000",
    borderWidth: 1,
  },
});
