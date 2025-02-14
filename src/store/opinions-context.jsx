// context object and provider:

import { createContext, useEffect, useState } from "react";

export const OpinionsContext = createContext({
  opinions: null,
  addOpinion: (opinion) => {},
  upvoteOpinion: (id) => {},
  downvoteOpinion: (id) => {},
});

export function OpinionsContextProvider({ children }) {
  const [opinions, setOpinions] = useState();

  useEffect(() => {
    async function loadOpinions() {
      const response = await fetch("http://localhost:3000/opinions");
      const opinions = await response.json();
      setOpinions(opinions); // set new state
    }

    loadOpinions();
  }, []);

  // sending opinions to backed - method POST:
  async function addOpinion(enteredOpinionData) {
    const response = await fetch("http://localhost:3000/opinions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredOpinionData),
    });

    if (!response.ok) {
      return;
    }

    const savedOpinion = await response.json();
    setOpinions((prevOpinions) => [savedOpinion, ...prevOpinions]);
  }

  function upvoteOpinion(id) {
    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return { ...opinion, votes: opinion.votes + 1 };
        }
        return opinion;
      });
    });
  }

  function downvoteOpinion(id) {
    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return { ...opinion, votes: opinion.votes - 1 };
        }
        return opinion;
      });
    });
  }

  // enabled for every component taht needs it, through contextValue:
  const contextValue = {
    opinions: opinions,
    addOpinion,
    upvoteOpinion,
    downvoteOpinion,
  };

  return <OpinionsContext value={contextValue}>{children}</OpinionsContext>;
}

/* 

Ovaj kod definira React kontekst za upravljanje sa stavkama mišljenja (opinions) u tvojoj aplikaciji. Evo kako funkcioniše svaki dio:

Kreiranje Konteksta: OpinionsContext je kreiran koristeći createContext iz React-a. Početno stanje konteksta je postavljeno s opinions kao null, a funkcije addOpinion, upvoteOpinion i downvoteOpinion su inicijalno prazne funkcije koje se kasnije nadopunjuju.

OpinionsContextProvider Komponenta: Ova komponenta je prilagođeni provider za kontekst. U njoj se nalazi glavna logika za upravljanje mišljenjima (opinions).

useState: Koristi se useState za držanje stanja opinions. Početno stanje je undefined.

useEffect: Koristi se useEffect kako bi se asinkrono učitala mišljenja sa servera (na localhostu na portu 3000) prilikom prvog renderiranja komponente. Kada se mišljenja učitaju, postavljaju se koristeći setOpinions.

addOpinion: Funkcija addOpinion šalje novi unos mišljenja na server metodom POST, a zatim ažurira stanje opinions dodavanjem novog mišljenja na početak postojećih mišljenja.

upvoteOpinion i downvoteOpinion: Ove funkcije služe za glasovanje (upvoting i downvoting) za mišljenje s određenim ID-om. Koriste se setOpinions i map funkcija kako bi se ažuriralo stanje tako da se promeni broj glasova za određeno mišljenje.

contextValue: Varijabla contextValue sadrži trenutno stanje mišljenja (opinions), kao i sve funkcije (addOpinion, upvoteOpinion, downvoteOpinion) koje se prosleđuju kao vrednosti u kontekstu.

Vraćanje JSX-a: OpinionsContextProvider vraća JSX koji omogućava pristup kontekstu kroz value properti. Ovde se prosleđuju sve vrednosti konteksta (opinions i funkcije za manipulaciju mišljenjima) kao vrednost.

Ovaj kontekst omogućava bilo kojoj komponenti unutar svog stabla da pristupi i ažurira mišljenja bez potrebe za direktnim prosleđivanjem propsa kroz svaki nivo komponente.

*/



