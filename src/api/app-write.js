import { Client, Databases, Account, ID } from 'appwrite';
import { Server } from '../utils/config';

let api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let client = new Client();
    client.setEndpoint(Server.endpoint).setProject(Server.project);

    const account = new Account(client);
    const database = new Databases(client);

    api.sdk = { database, account };
    return api.sdk;
  },

  createAccount: (email, password, name) => {
    return api.provider().account.create('unique()', email, password, name);
  },

  getAccount: () => {
    let account = api.provider().account;
    return account.get();
  },

  createSession: (email, password) => {
    return api.provider().account.createEmailSession(email, password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession('current');
  },

  createDocument: (databaseId, collectionId, data, permissions) => {
    return api
      .provider()
      .database.createDocument(
        databaseId,
        collectionId,
        'unique()',
        data,
        permissions
      );
  },

  listDocuments: (databaseId, collectionId) => {
    return api.provider().database.listDocuments(databaseId, collectionId);
  },
  updateDocument: (databaseId, collectionId, documentId, data) => {
    return api
      .provider()
      .database.updateDocument(databaseId, collectionId, documentId, data);
  },
  deleteDocument: (databaseId, collectionId, documentId) => {
    return api
      .provider()
      .database.deleteDocument(databaseId, collectionId, documentId);
  },
};

export default api;