import { connect } from 'mongoose';

const uri = 'mongodb+srv://prashantsingh090798:9fWpOKedxKBFx6aX@payroll-app-cluster.clhjsqy.mongodb.net/?retryWrites=true&w=majority&appName=Payroll-App-Cluster';

const dbconnect = async()=> {
    try {

        await connect(uri);
        console.log('Database connected successfully');
    } catch(err) {
        console.log('Error : ' + err);
    }
};

export default dbconnect;