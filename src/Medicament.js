export class Medicament {
  constructor(id, nom, quantiteParUnite, imageURL, unitesEnStock, href) {
    this._id = id;
    this._nom = nom;
    this._quantiteParUnite = quantiteParUnite;
    this._imageURL = imageURL;
    this._unitesEnStock = unitesEnStock;
    this._href = href || '';
  }

  get id() {
    return this._id;
  }

  get nom() {
    return this._nom;
  }

  get quantiteParUnite() {
    return this._quantiteParUnite;
  }

  get imageURL() {
    return this._imageURL;
  }

  get unitesEnStock() {
    return this._unitesEnStock;
  }

  get href() {
    return this._href;
  }

  set nom(value) {
    this._nom = value;
  }

  set quantiteParUnite(value) {
    this._quantiteParUnite = value;
  }

  set imageURL(value) {
    this._imageURL = value;
  }

  set unitesEnStock(value) {
    this._unitesEnStock = value;
  }

  set href(value) {
    this._href = value;
  }

  toString() {
    return `Médicament : ${this._nom}, Quantité par unité : ${this._quantiteParUnite}, Stock : ${this._unitesEnStock}`;
  }
}