import Pure_Router from "../0.0_Pure_Router/pure_router.js";

import Database_Router_CAM from "../0.6_DataBase_Router_ClinetAccountManager/database_router_CAM.js";
import { google_certificater } from "../0.2_Google_Certification_Router/google_certification_router.js";

import Session_Crypto from "../0.10_Tools/0.10.3_Session_Crypto/session_crypto.js";
import { File_Reader } from "../0.10_Tools/0.10.2_File_Reader_API/file_reader.js";
import { Password_Genarator } from "../0.10_Tools/0.10.1_Password_Genagrator_API/password_genarator_api.js";

import multer from 'multer';

class Account_Register_Router extends Pure_Router {

    constructor(){
    super()
    }

    async Load_UserData(request, input){

    let DB = new Database_Router_CAM()
    let result = await DB.Select_User(request, input)
    
    return result
    }

    async Check_User_Exist(verify_list, input){

    let result = await this.Load_UserData(verify_list, input)
    switch(typeof result){
        case('undefined'):
        result = 'Need_Registeration'
        break;

        case('object'):
        result = 'Account_already_exist'
        break;
    }
    return result;
    }

    async Create_NewUser(confirm_email, input){

    let DB = new Database_Router_CAM()
    let condition = await this.Check_User_Exist(['email'],[confirm_email])

    switch(condition){
        case('Need_Registeration'):
        let result = await DB.Add_User(input)
        return result;

        case('Account_already_exist'):
        return 'Need_To_Find';
    }

    }

    Manage_account_register_Routes(){

        const storage = multer.memoryStorage()
        const upload = multer({ storage: storage })
        
        this.Pure_Router.post('/', upload.single('picture'), async (req, res)=>{

            if(req.file){
                
            let condition = await this.Create_NewUser(`${req.body.email}`, 
                [`${req.body.email}`,`${req.body.name}`, req.file.buffer,`${req.body.password}`,`${req.body.position}`])

            switch(condition){
                case('Need_To_Find'):
                res.write("<script>alert('Need to find email')</script>")
                res.write("<script>window.location=\"/login/foodscript-login\"</script>");
                res.end()
                return;

                default:
                res.write("<script>alert('You just created your account')</script>")
                res.write("<script>window.location=\"/login/foodscript-login\"</script>");
                res.end()

            }
            }}
        )

            
        this.Pure_Router.get('/signup-with-google',async (req, res)=>{
            
            let condition = req.session.data

            switch(typeof condition){
                case('undefined'):
                res.redirect('/login/google')
                return;

                case('string'):
                console.log('string_case')
                const session_crypto = new Session_Crypto();
                const file_reader = new File_Reader();
                const password_genarator = new Password_Genarator();

                let decrypted = await session_crypto.de_crypto(req.session.data)
                let result = JSON.parse(decrypted)

                    switch(result.authorization){
                        case('google'):
                        
                            switch( await result.temporary_certification ){
                                case('verified'):

                                    const condition = await this.Create_NewUser(`${result.userinfo.email}`, 
                                    [`${result.userinfo.email}`,
                                     `${result.userinfo.name}`,
                                      await file_reader.read_file(`./public/Profile_Stranger_icon.jpg`),
                                      `${password_genarator.genarate_password(8)}`,
                                      `reviewer`])

                                    if(condition == 'Need_To_Find'){
                                    res.write("<script>alert('You already have googel connected account, try with that account')</script>")
                                    res.write("<script>window.location=\"/login\"</script>");
                                }
                                else{
                                    google_certificater.Register_verified_UserInfo(result.userinfo, 'verified', 'verified')
                                    res.redirect(`/googlelogin/sessionset`)
                                }

                                return;
                                
                                case('unverified'):
                                res.redirect('/login/google')
                                return;
                            }
                            return;


                        case(undefined):
                        console.log('authorization_undefined')
                        res.redirect('/login/google')
                        return;
                    }

            }}
        )

    }

}

let account_register = new Account_Register_Router();
account_register.Manage_account_register_Routes();

let Account_Register_Routes = account_register.Pure_Router
export {Account_Register_Routes, Account_Register_Router};