import forge from 'node_modules/node-forge/dist/forge.min.js';

export default class TransactionOutput {
  constructor(receiverWallet, value) {
    this.receiverHash = receiverWallet.hash;
    this.value = value;
    this.hash = this._hash();
  }
  
  get displayName() {
    if (!this.hash) {
      return "#NotAName";
    }
    
    return "#" + this.hash.substring(0, 10);
  }
  
  _hash() {
    const sha256 = forge.md.sha256.create();
    sha256.update(
      this.receiverHash + 
      this.value
    );
    return sha256.digest().toHex();
  }
}