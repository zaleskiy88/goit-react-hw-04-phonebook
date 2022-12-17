import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import {
  ContactsForm,
  ContactsList,
  ContactsFilter,
  AppContainer,
} from 'index';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const storageContacts = localStorage.getItem('contacts');
  const parsedContacts = JSON.parse(storageContacts);

  const formSubmitHandler = ({ name, number }) => {
    const normalizedNameValue = name.toLowerCase();
    const normalizedNamesArr = contacts.map(contact =>
      contact.name.toLowerCase()
    );

    if (normalizedNamesArr.includes(normalizedNameValue)) {
      alert(`${name} is already in the list`);
      return false;
    } else {
      setContacts(state => [...state, { id: nanoid(), name, number }]);
      return true;
    }
  };

  const inputHandler = evt => {
    const { value } = evt.currentTarget;

    setFilter(value);
  };

  const getFilteredContacts = () => {
    const normalizedFilterValue = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilterValue)
    );
  };

  const onDelete = contactId => {
    setContacts(state => {
      return state.filter(contact => contact.id !== contactId);
    });
  };

  useEffect(() => {
    if (parsedContacts) {
      setContacts(parsedContacts);
    } else {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = getFilteredContacts();
  return (
    <AppContainer>
      <h2>Phonebook</h2>
      <ContactsForm onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>
      <ContactsFilter inputHandler={inputHandler} />
      <ContactsList contacts={filteredContacts} onDelete={onDelete} />
    </AppContainer>
  );
};
