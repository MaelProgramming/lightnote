import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface HomeStyle {
  container: ViewStyle;
  text: TextStyle;
  input: TextStyle;
  noteItem: ViewStyle;
  noteText: TextStyle;
}

interface HeaderStyle {
  container: ViewStyle;
  text: TextStyle;
}

const colors = {
  background: '#000',
  headerBackground: '#111',
  textPrimary: '#fff',
  textHeader: '#f00',
  noteBackground: '#222',
  placeholderText: '#888',
};

const homeStyle = StyleSheet.create<HomeStyle>({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.textPrimary,
    borderRadius: 5,
    padding: 10,
    color: colors.textPrimary,
    fontSize: 16,
    marginBottom: 10,
  },
  noteItem: {
    backgroundColor: colors.noteBackground,
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  noteText: {
    color: colors.textPrimary,
    fontSize: 16,
  },
});

const headerStyle = StyleSheet.create<HeaderStyle>({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.headerBackground,
  },
  text: {
    fontFamily: 'Cochin',
    fontSize: 24,
    color: colors.textHeader,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export { homeStyle, headerStyle, colors };
