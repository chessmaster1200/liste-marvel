import { useState } from "react";
import "./App.css";

export default function App() {
  const [characters, setCharacters] = useState([
    { name: "Iron Man", realName: "Tony Stark", universe: "Marvel Universe" },
    { name: "Captain America", realName: "Steve Rogers", universe: "Marvel Universe" },
    { name: "Thor", realName: "Thor Odinson", universe: "Marvel Universe" },
    { name: "Hulk", realName: "Bruce Banner", universe: "Marvel Universe" },
    { name: "Black Widow", realName: "Natasha Romanoff", universe: "Marvel Universe" },
    { name: "Hawkeye", realName: "Clint Barton", universe: "Marvel Universe" },
    { name: "Spider-Man", realName: "Peter Parker", universe: "Marvel Universe" },
    { name: "Doctor Strange", realName: "Stephen Strange", universe: "Marvel Universe" },
    { name: "Black Panther", realName: "T'Challa", universe: "Marvel Universe" },
    { name: "Scarlet Witch", realName: "Wanda Maximoff", universe: "Marvel Universe" },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({ name: "", realName: "", universe: "" });
  const [newCharacter, setNewCharacter] = useState({ name: "", realName: "", universe: "" });

  // Supprimer avec confirmation
  const deleteCharacter = (index) => {
    const char = characters[index];
    const confirmDelete = window.confirm(
      `Voulez-vous vraiment supprimer ${char.name} (${char.realName}) de l'univers ${char.universe} ?`
    );
    if (confirmDelete) {
      const updated = characters.filter((_, i) => i !== index);
      setCharacters(updated);
    }
  };

  // Activer le mode édition
  const editCharacter = (index) => {
    setEditingIndex(index);
    setEditData({ ...characters[index] });
  };

  // Sauvegarder la modification
  const saveEdit = (index) => {
    const updated = [...characters];
    updated[index] = { ...editData };
    setCharacters(updated);
    setEditingIndex(null);
    setEditData({ name: "", realName: "", universe: "" });
  };

  // Ajouter un nouveau personnage
  const addCharacter = () => {
    if (newCharacter.name && newCharacter.realName && newCharacter.universe) {
      setCharacters([...characters, newCharacter]);
      setNewCharacter({ name: "", realName: "", universe: "" });
    } else {
      alert("Veuillez remplir tous les champs avant d'ajouter !");
    }
  };

  return (
    <div className="app">
      <h1>⚡ Personnages Marvel ⚡</h1>

      {/* Formulaire d'ajout */}
      <div className="add-box">
        <h2>Ajouter un personnage</h2>
        <input
          type="text"
          placeholder="Nom du héros"
          value={newCharacter.name}
          onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Vrai nom"
          value={newCharacter.realName}
          onChange={(e) => setNewCharacter({ ...newCharacter, realName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Univers"
          value={newCharacter.universe}
          onChange={(e) => setNewCharacter({ ...newCharacter, universe: e.target.value })}
        />
        <button className="add-btn" onClick={addCharacter}>➕ Ajouter</button>
      </div>

      {/* Liste */}
      <ul>
        {characters.map((char, index) => (
          <li key={index} className="list-item">
            {editingIndex === index ? (
              <div className="edit-box">
                <input
                  type="text"
                  placeholder="Nom du héros"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Vrai nom"
                  value={editData.realName}
                  onChange={(e) => setEditData({ ...editData, realName: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Univers"
                  value={editData.universe}
                  onChange={(e) => setEditData({ ...editData, universe: e.target.value })}
                />
                <button onClick={() => saveEdit(index)}>💾 Sauvegarder</button>
              </div>
            ) : (
              <div>
                <span>
                  <strong>{char.name}</strong> — {char.realName} <em>({char.universe})</em>
                </span>
                <div className="btns">
                  <button className="edit-btn" onClick={() => editCharacter(index)}>✏️ Modifier</button>
                  <button className="delete-btn" onClick={() => deleteCharacter(index)}>🗑️ Supprimer</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
