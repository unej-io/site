import type { CollectionReference, FieldPath, FirestoreDataConverter, SetOptions, WhereFilterOp } from "firebase-admin/firestore";

import { hasOwnProperty } from "javascript-yesterday";

import firestore from "../firestore";

type QueryConstraint = {
  fieldPath: (string & {}) | FieldPath;
  opStr: WhereFilterOp;
  value: unknown;
};

function where<P extends (string & {}) | FieldPath>(fieldPath: P, opStr: WhereFilterOp, value: unknown): QueryConstraint {
  return { fieldPath, opStr, value };
}

type CollectionOptions<T> = {
  converter: FirestoreDataConverter<T>;
};

class Collection<T extends {} = {}> {
  public name: string;
  private $ref: CollectionReference<T>;
  private $converter: FirestoreDataConverter<T>;

  constructor(name: string, options: CollectionOptions<T>) {
    this.name = name;

    const { converter } = options;
    this.$converter = converter;
    this.$ref = this.$collection();
  }

  private $collection() {
    return firestore.collection(this.name).withConverter(this.$converter);
  }

  private $doc(path: string) {
    return this.$ref.doc(path).withConverter(this.$converter);
  }

  public async addDoc(data: T) {
    await this.$ref.add(data);
  }

  public async setDoc(data: Partial<T>, options: SetOptions = { merge: true }) {
    if (hasOwnProperty(data, "id") && typeof data.id === "string") {
      return await this.$ref.doc(data.id).set(data, options);
    }
    throw new Error(`Invalid ${this.name} id`);
  }

  public async getDoc(path: string) {
    return await this.$doc(path).get();
  }

  public async getDocs() {
    return await this.$ref.get();
  }

  public async query(
    getConstraints: (
      where: <P extends (string & {}) | FieldPath | Exclude<keyof T, symbol | number>>(
        fieldPath: P,
        opStr: WhereFilterOp,
        value: unknown
      ) => QueryConstraint
    ) => QueryConstraint[]
  ) {
    const constraints = getConstraints(where);

    if (constraints.length > 0) {
      const [first, ...others] = constraints;

      const ref = others.reduce((_ref, { fieldPath, opStr, value }) => {
        return _ref.where(fieldPath, opStr, value);
      }, this.$ref.where(first.fieldPath, first.opStr, first.value));

      return await ref.get();
    } else {
      return await this.$ref.get();
    }
  }
}

export default Collection;
