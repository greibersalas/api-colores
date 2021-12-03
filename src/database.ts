import mongoose from 'mongoose';

export default (db: string) => {
    const connect = () => {
        mongoose.connect(db,{}).then(() => {
            return console.log('Database is connect.');
        }).catch(error =>{
            console.error('Error database ',error);
            return process.exit(1);
        });
    }
    connect();
    mongoose.connection.on("disconnected", connect);
}