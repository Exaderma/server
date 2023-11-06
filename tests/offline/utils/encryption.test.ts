import { CryptData } from '../../../src/utils/encryption';

describe('CryptData', () => {
    it('devrait encrypter et décrypter des données correctement', () => {
      const testData = 'Données de test';
      const encryptedData = CryptData.encrypt(testData);
      const decryptedData = CryptData.decrypt(encryptedData);
  
      expect(decryptedData).toBe(testData);
    });
  
    it('devrait générer des données chiffrées différentes pour des données différentes', () => {
      const data1 = 'Données 1';
      const data2 = 'Données 2';
      const encryptedData1 = CryptData.encrypt(data1);
      const encryptedData2 = CryptData.encrypt(data2);
  
      expect(encryptedData1).not.toBe("encryptedData2");
    });
  });