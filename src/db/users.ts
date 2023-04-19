import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type:String, required:true, message:'Kullanıcı adı alanı zorunludur'},
    email: { type:String, required:true, message:'Email alanı zorunludur'},
    authentication : {
        password: {type:String, required:true, select:false, message:'Parola alanı zorunludur'},
        salt: {type:String, select:false},
        sessionToken: {type:String, select:false}
    },
    age:{type:Number, required:true, message:'Yaş alanı zorunludur'},    
    sex:{type:Boolean, required:true, message:'Cinsiyet alanı zorunludur'},     //true = Man, False= Woman
    phone:{type:String, required:true, message:'Telefon numarası alanı zorunludur'}
});


export const UserModel = mongoose.model('User',UserSchema);
export const getUser = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({email});
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({'authentication.sessionToken':sessionToken,});
export const getUserById = (id:string) => UserModel.findById(id);
export const createUser = (values: Record<string,any>)=> new UserModel(values).save().then((user)=>user.toObject());
export const deleteUserById = (id:string) => UserModel.findOneAndDelete({_id:id});
export const updateUserById = (id:string,values: Record<string,any>) => UserModel.findByIdAndUpdate(id,values);

