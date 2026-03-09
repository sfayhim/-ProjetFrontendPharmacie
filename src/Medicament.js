export class Medicament {
  constructor(id, denomination, formepharmaceutique, photo, qte) {
    this._id = id;
    this._denomination = denomination;
    this._formepharmaceutique = formepharmaceutique;
    this._photo = photo;
    this._qte = qte;
  }

  get id() {
    return this._id;
  }

  get denomination() {
    return this._denomination;
  }

  get formepharmaceutique() {
    return this._formepharmaceutique;
  }

  get photo() {
    return this._photo;
  }

  get qte() {
    return this._qte;
  }

  set denomination(value) {
    this._denomination = value;
  }

  set formepharmaceutique(value) {
    this._formepharmaceutique = value;
  }

  set photo(value) {
    this._photo = value;
  }

  set qte(value) {
    this._qte = value;
  }

  toString() {
    return `Médicament : ${this._denomination}, Forme : ${this._formepharmaceutique}, Qté : ${this._qte}`;
  }
}
