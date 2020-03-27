/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import mongoose from 'mongoose';


const Db = {
  removeAllCollections: async () => {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany();
    }
  }

};

export default Db;
