import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Card from '../Card/Card';
import { deleteDeck, readDeck } from '../utils/api';

export const Deck = () => {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ cards: [] });

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  if (deck) {
    const deckList = deck.cards.map((card) => <Card key={card.id} card={card} />);
    return (
      <div className="container">

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">
                <span className="oi oi-home" /> Home
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>

        <div className="card shadow mb-4">
          <h3 className="card-header">{deck.name}</h3>
          <div className="card-body">
            <p className="card-text">{deck.description}</p>
          </div>
          
          <div className="card-footer bg-transparent d-flex justify-content-between">
            <div>
              <Link to={`/decks/${deck.id}/study`} className="btn btn-primary m-2">
                <span className="oi oi-globe" /> Study
              </Link>
            
              <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-secondary m-2">
                <span className="oi oi-plus" /> Add Cards
              </Link>

              <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary m-2">
                <span className="oi oi-pencil" /> Edit Deck
              </Link>
            </div>

            <div>
              <button
                className="btn btn-danger m-2"
                id={deck.id}
                onClick={async () => {
                  const result = window.confirm(
                    'Delete this deck? \nYou will not be able to recover it.'
                  );
                if (result) {
                  deleteDeck(deck.id).then(history.push('/'));
                  }
                }}
              >
                <span className="oi oi-trash" /> Delete
              </button>
            </div>

          </div>
        </div>

        <div>
          <h2>Cards</h2>
          {deckList.length ? (
            <div className="row row-cols-lg-3 row-cols-sm-1 g-4">{deckList}</div>
          ) : (
            <div>
              <p>Add some cards to study!</p>
            <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-secondary m-2">
                <span className="oi oi-plus" /> Add Cards
              </Link>
            </div>
          )}
        </div>

      </div>
    );
  } else {
    return <div>No Deck</div>;
  }
};

export default Deck;