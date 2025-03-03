import Pure_Router from "../../0.0_Pure_Router/pure_router.js"

import Database_Router_CUCM from "../../0.6_DataBase_Router_ClinetAccountManager/0.6.1_DataBase_Router_ClientUsercreationManager/database_router_CUCM.js"

import { image_file_loader } from "../../0.10_Tools/0.10.7_Image_File_Loader/image_file_loader.js"

class Usercreation_R_Router extends Pure_Router {

    constructor(){
    super()
    }

    Manage_Loading_PostData_API(){

        this.Pure_Router.get('/read_reviews/user/:user_id', async (req,res)=>{

            const DB = new Database_Router_CUCM();
            const INPUT = Number(req.params.user_id)

            let reviews_data = await DB.Select_Post(['user_id'],[INPUT],'user_post','user_post',10)

            reviews_data.forEach((element, index) => {

                const single_review_data = element
                const picture_url_array = []
                const PICTURE_URL = `/imagedata/review/${single_review_data.id}`

                image_file_loader.Add_HTTP_Image_Router(
                    `/review/${single_review_data.id}`,
                    element.user_post_pictures ,'array')

                element.user_post_pictures.forEach((e, index)=>{
                    picture_url_array.push(PICTURE_URL + `/${index}`)
                    element.picture_url_array = [...picture_url_array]
                })
            });

            res.json({result:reviews_data})
        })

        this.Pure_Router.get('/read_review/:review_id', async (req,res)=>{

            const DB = new Database_Router_CUCM();
            const INPUT = Number(req.params.review_id)

            // let reviews_data = await DB.Select_Post(['user_id'],[INPUT],'user_post','user_post',10)

            // reviews_data.forEach((element, index) => {

            //     const single_review_data = element
            //     const picture_url_array = []
            //     const PICTURE_URL = `/imagedata/review/${single_review_data.id}`

            //     image_file_loader.Add_HTTP_Image_Router(
            //         `/review/${single_review_data.id}`,
            //         element.user_post_pictures ,'array')

            //     element.user_post_pictures.forEach((e, index)=>{
            //         picture_url_array.push(PICTURE_URL + `/${index}`)
            //         element.picture_url_array = [...picture_url_array]
            //     })
            // });

            // res.json({result:reviews_data})
        })

        this.Pure_Router.get('/read_reviews/place/:placecode', async (req,res)=>{

            const DB = new Database_Router_CUCM();
            const INPUT = req.params.placecode

            const result = await DB.Select_Post(['placecode'],[INPUT],'user_post','user_post',10)
            res.json({result:result})
            res.end()
        })
        
    }

}

let usercreation_r_router = new Usercreation_R_Router()
usercreation_r_router.Manage_Loading_PostData_API()

let Usercreation_R_Routes = usercreation_r_router.Pure_Router
export default Usercreation_R_Routes;