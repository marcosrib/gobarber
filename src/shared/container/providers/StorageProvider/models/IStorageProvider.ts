export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deletFile(file: string): Promise<void>;
}
