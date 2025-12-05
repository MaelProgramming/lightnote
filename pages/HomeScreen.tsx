import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from "react-native";
import FileUpload from "../utils/FileInput"; // Composant d'upload de fichier
import AsyncStorage from "@react-native-async-storage/async-storage";
import { homeStyle } from "../styles/styles";
import Footer from "../components/Footer";
import { Gap } from "../utils/Gap";
import Header from "../components/Header";

interface Note {
  id: string;
  text: string;
}

const STORAGE_KEY = "@notes";

const HomeScreen: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputText, setInputText] = useState("");

  // Charger les notes depuis le stockage
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setNotes(JSON.parse(json));
      } catch (error) {
        console.error("Erreur lors du chargement des notes :", error);
      }
    };
    loadNotes();
  }, []);

  // Sauvegarder les notes dans le stockage
  const saveNotes = async (notesToSave: Note[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notesToSave));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des notes :", error);
    }
  };

  // Ajouter une note
  const addNote = () => {
    if (!inputText.trim()) {
      Alert.alert("Erreur", "Le texte de la note est vide !");
      return;
    }
    const newNote: Note = {
      id: Date.now().toString(),
      text: inputText.trim(),
    };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    setInputText("");
    saveNotes(updatedNotes);
  };

  // Supprimer une note
  const deleteNote = (id: string) => {
    Alert.alert("Supprimer la note ?", "", [
      { text: "Annuler", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          const updatedNotes = notes.filter((note) => note.id !== id);
          setNotes(updatedNotes);
          saveNotes(updatedNotes);
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Light-Note" />

      <View style={homeStyle.container}>
        <Text style={homeStyle.text}>Mes Notes</Text>
        <Gap size={20} />

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#fff",
            width: "100%",
            padding: 10,
            color: "#fff",
            borderRadius: 5,
          }}
          placeholder="Nouvelle note"
          placeholderTextColor="#ccc"
          value={inputText}
          onChangeText={setInputText}
        />

        {/* Utilisation correcte du composant FileUpload */}
        <View style={{ marginVertical: 10 }}>
          <FileUpload onFileSelected={(fileName) => {
            const newNote: Note = {
              id: Date.now().toString(),
              text: fileName,
            };
            const updatedNotes = [newNote, ...notes];
            setNotes(updatedNotes);
            saveNotes(updatedNotes);
          }} />
        </View>

        <Button title="Ajouter" onPress={addNote} />

        <Gap size={20} />

        {notes.length === 0 ? (
          <Text style={homeStyle.text}>Aucune note pour le moment.</Text>
        ) : (
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => deleteNote(item.id)}>
                <View
                  style={{
                    backgroundColor: "#222",
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                >
                  <Text style={{ color: "#fff" }}>{item.text}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <Footer copyright="2025, By Mael Developpement, Light Note, All rights reserved" />
    </View>
  );
};

export default HomeScreen;
