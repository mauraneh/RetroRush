import { useRef, useEffect } from 'react';

const useSoundsManager = ({ initializeGame, isSoundEnabled }) => {
  const audioRef = useRef();

  const playSound = async (src) => {
    try {
      if (isSoundEnabled) {
        // Mettre en pause et réinitialiser l'objet audio s'il existe déjà
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }

        // Créer un nouvel objet audio avec la source fournie
        audioRef.current = new Audio(src);

        // Définir le volume à 1 (plein volume)
        audioRef.current.volume = 1;

        // Lancer la lecture du son
        await audioRef.current.play();

        // Ajouter une promesse pour gérer la fin de la lecture du son
        audioRef.current.play().then(() => {
          // Vérifier si les effets sonores sont activés et s'il existe une fonction d'initialisation du jeu
          if (isSoundEnabled && initializeGame !== undefined) {
            // Appeler la fonction d'initialisation du jeu
            initializeGame();
          }
        });
      } 
    } catch (error) {
      console.error('Erreur de lecture du son:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isSoundEnabled]);

  return { playSound, audioRef };
};

export default useSoundsManager;
