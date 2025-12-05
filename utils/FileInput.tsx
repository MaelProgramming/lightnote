// FileUpload.tsx
import React from "react";
import { Button, Alert, Platform, PermissionsAndroid } from "react-native";
// ✅ Importation corrigée finale : on utilise pick et les types nommés
import { pick, types, DocumentPickerResponse } from "@react-native-documents/picker";

interface FileUploadProps {
  onFileSelected: (fileName: string) => void;
}

const requestStoragePermission = async () => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "Permission d'accès aux fichiers",
        message: "L'application a besoin d'accéder à vos fichiers pour sélectionner un fichier",
        buttonNeutral: "Demander plus tard",
        buttonNegative: "Annuler",
        buttonPositive: "OK",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected }) => {
  const handleFilePick = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert("Permission refusée", "Impossible d'accéder aux fichiers sans permission.");
      return;
    }

    try {
      // 1. Appel corrigé : Utilisation de 'pick' (importé en export nommé)
      //    et ajout de allowMultiSelection: false pour simuler pickSingle.
      //    Note: 'pick' retourne toujours un tableau d'objets (même pour un seul fichier).
      const results: DocumentPickerResponse[] = await pick({
        type: types.allFiles,
        allowMultiSelection: false, 
      });

      // 2. Vérification du résultat (qui est un tableau) et extraction du premier élément
      if (!results || results.length === 0) return;
      const file = results[0]; // On prend le seul fichier sélectionné

      if (!file.uri) return;

      console.log(file.uri, file.name);
      Alert.alert("Fichier sélectionné", file.name ?? "Fichier");

      // Retourne le nom du fichier au parent
      if (file.name) onFileSelected(file.name);
      
    } catch (err) {
      // 3. Gestion de l'annulation corrigée : Utilisation du code d'erreur
      const isCancelled = 
          typeof err === 'object' && err !== null && 'code' in err && 
          (err as { code: string }).code === 'E_PICKER_CANCELLED';

      if (isCancelled) {
        console.log("Sélection annulée");
      } else {
        console.error(err);
        Alert.alert("Erreur", "Une erreur est survenue lors de la sélection du fichier.");
      }
    }
  };

  return <Button title="Sélectionner un fichier" onPress={handleFilePick} />;
};

export default FileUpload;