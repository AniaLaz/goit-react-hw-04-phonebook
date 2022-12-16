import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Form from '../Form/Form';
import Contacts from '../Contacts/Contacts';
import Filter from '../Filter/Filter';
import css from 'components/App/App.module.css';

const LS_KEY = 'contact';

export function App() {
  const [contacts, setContacts] = useState(() => {
    const saveStayt = localStorage.getItem(LS_KEY);
    if (saveStayt) {
      return JSON.parse(saveStayt);
    }
    return [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = (name, number) => {
    console.log(contacts);
    const comparisoName = contacts
      .map(contact => contact.name.toLowerCase())
      .some(contact => contact === name.toLowerCase());
    console.log(name);
    console.log(number);
    if (!comparisoName) {
      console.log('іф працює');
      setContacts(prevContact => [{ id: nanoid(), name, number }, ...contacts]);
    } else {
      window.alert(`${name} is already in contacts`);
    }
  };

  const getContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const onChange = e => {
    setFilter(e.currentTarget.value);
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <Form onSubmit={addContacts} />
      <h2>Contacts</h2>
      {contacts.length > 0 && (
        <div>
          <Filter onChange={onChange} value={filter} />
          <Contacts visibleArr={getContact()} onDelete={deleteContact} />
        </div>
      )}
    </div>
  );
}


// export class App extends Component {

// ++
//   state = {
//     contacts: [],
//     filter: '',
//   };
//

// ++
//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.contacts.length !== this.state.contacts.length) {
//       localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
//     }
//   }

// ++
//   componentDidMount() {
//     const saveStayt = localStorage.getItem(LS_KEY);
//     if (saveStayt){this.setState({ contacts:( JSON.parse(saveStayt)) });}
//   }

// ++
//   addContacts = (name, number) => {
//     const { contacts } = this.state;
//     const comparisoName = contacts
//       .map(contact => contact.name.toLowerCase())
//       .some(contact => contact === name.toLowerCase());
//     if (!comparisoName) {
//       this.setState(prevState => ({
//         contacts: [{ id: nanoid(), name, number }, ...prevState.contacts],
//       }));
//     } else {
//       this.addalert();
//     }
//   };

// ++
//   addalert = name => {
//     window.alert(`${name} is already in contacts`);
//   };

// ++
//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   onChange = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

// ++
//   getContact = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     const { contacts } = this.state;
//     const visibleArr = this.getContact();

//     return (
//       <div className={css.container}>
//         <h1>Phonebook</h1>
//         <Form onSubmit={this.addContacts} />
//         <h2>Contacts</h2>

//         {contacts.length > 0 && (
//           <div>
//             <Filter onChange={this.onChange} value={this.state.filter} />
//             <Contacts onDelete={this.deleteContact} visibleArr={visibleArr} />
//           </div>
//         )}
//       </div>
//     );
//   }
// }
