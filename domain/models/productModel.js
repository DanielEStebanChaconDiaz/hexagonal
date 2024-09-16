const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/mongodb");

class Product {
    async findById(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('products');
        const [res] = await collection.find({_id: new ObjectId(id)}).toArray();
        return res;
    }

    async insert(productData) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('products');
        const res = await collection.insertMany([productData]);
        return res;
    }

    async findByIdAndUpdate(id, updateData, upsert) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('products');
        const res = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData }, upsert);
        return res;
    }

    async findByIdAndDelete(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('products');
        const res = await collection.deleteMany({ _id: new ObjectId(id) });
        return res;
    }

    async findByCategory(category) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('products');
        return await collection.find({ category: category }).toArray();
    }
}

module.exports = Product;