import { v4 as uuidv4 } from 'uuid';

export default function () {
  let uuid = window.localStorage.getItem('uuid');

  if (!uuid) {
    uuid = uuidv4();

    window.localStorage.setItem('uuid', uuid);
  }

  return uuid;
}
