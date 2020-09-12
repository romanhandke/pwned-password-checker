import CryptoJs from "crypto-js";
import axios, { AxiosResponse } from "axios";

export default class PasswordChecker {
  apiUri = "https://api.pwnedpasswords.com/range/";

  public async hasBeenLeaked(password: string) {
    const hashedPassword = this.hashPassword(password);
    const firstFive = hashedPassword.substring(0,5);
    const tail = hashedPassword.substring(5, hashedPassword.length);

    const hashList = await axios.get(this.apiUri + firstFive)
    const hashes = this.getHashes(hashList.data);

    return hashes.indexOf(tail.toUpperCase()) > -1;
  }

  protected hashPassword(password: string): string {
    return CryptoJs.SHA1(password).toString(CryptoJs.enc.Hex);
  }

  protected getHashes(hashList: string): Array<string> {
    const rows = hashList.split("\n");
    const hashes: Array<string> = [];
    rows.forEach((row: string) => hashes.push(row.split(":")[0]))

    return hashes;
  }
}
