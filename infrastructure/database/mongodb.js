const { MongoClient } = require("mongodb");

class ConnectToDatabase {
    static instanceConnect;
    db;
    connection;
    user;
    #password;
    
    constructor({ user, pwd } = { user: process.env.MONGO_USER, pwd: process.env.MONGO_PWD }) {
        if (ConnectToDatabase.instanceConnect && this.connection) {
            return ConnectToDatabase.instanceConnect;
        }
        this.user = user;
        this.setPassword = pwd;
        ConnectToDatabase.instanceConnect = this;
    }
    
    async connectOpen() {
        const uri = `${process.env.MONGO_ACCESS}${this.user}:${this.getPassword}@${process.env.MONGO_HOST}${process.env.MONGO_DB_NAME}`;
        
        this.connection = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        
        try {
            await this.connection.connect();
            this.db = this.connection.db();
            console.log('Connected successfully to MongoDB');
        } catch (error) {
            this.connection = undefined;
            console.error('Error connecting to MongoDB:', error);
            throw new Error('Error connecting');
        }
    }
    
    async connectClose() {
        if (this.connection) {
            await this.connection.close();
            console.log('MongoDB connection closed');
        }
    }
    
    get getPassword() {
        return this.#password;
    }
    
    set setPassword(pwd) {
        this.#password = pwd;
    }
}

module.exports = ConnectToDatabase;
