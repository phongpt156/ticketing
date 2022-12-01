function describePerson(person: {
  name: string;
  age: number;
  hobbies: [string, string]; // tuple
}) {
  return `${person.name} is ${
    person.age
  } years old and love ${person.hobbies.join(' and  ')}.`;
}
const alex = {
  name: 'Alex',
  age: 20,
  hobbies: ['walking', 'cooking'], // type string[] != [string, string]
};

// type b = ReturnType<() => string | number>;

// describePerson(alex);

interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
