export class Medicament {
  constructor(id, denomination, formepharmaceutique, photo, qte) {
    this._denomination = denomination;
    this._formepharmaceutique = formepharmaceutique;
    this._photo = photo;
    this._qte = qte;
    this._id = id;
  }
  // ---- getters
  get denomination() {
    return this._denomination;
  }
  get id() {
    return this._id;
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
  // ---- setters
  denomination(denomination) {
    this._denomination = denomination;
  }
  formepharmaceutique(formepharmaceutique) {
    this._formepharmaceutique = formepharmaceutique;
  }
  photo(photo) {
    this._photo = photo;
  }
  qte(qte) {
    this._qte = qte;
  }
  // -- toString
  toString() {
    return `Médicament : ${this._denomination}, Forme : ${this._formepharmaceutique}, Quantité : ${this._qte}`;
  }
}
