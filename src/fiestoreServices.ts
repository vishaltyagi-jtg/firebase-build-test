import firebase from "./firebase.config";
import {ITodoData} from "./types"

const db = firebase.collection("/tutorials");

class TodoServices {
  getAll() {
    return db.get();
  }

  create(tutorial: ITodoData) {
    return db.add(tutorial);
  }

  update(id: string, value: any) {
    return db.doc(id).update(value);
  }

  delete(id: string) {
    return db.doc(id).delete();
  }
}

export default new TodoServices();
