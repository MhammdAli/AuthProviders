import axios from "axios";
export interface Provider{
    exhangeCode(code : String) : Promise<Object>;
    getUserInfo(token : String) : Promise<Object>;
} 

export class GmailProvider implements Provider{
    private static clientId = process.env.GOOGLE_CLINET_ID;
    private static secret = process.env.GOOGLE_CLIENT_SECRET;
    private static exchangeTokenUrl = "https://oauth2.googleapis.com/token"

   
    async exhangeCode(code: string): Promise<Object> {
 
        try{
            const {data}  = await axios.post(GmailProvider.exchangeTokenUrl,{
                client_id : GmailProvider.clientId,
                client_secret  : GmailProvider.secret,
                code,
                grant_type : "authorization_code",
                redirect_uri: "http://localhost:3000/exchange", 
                scope : "https://www.googleapis.com/auth/userinfo.profile"
            } )
           
            
            return Promise.resolve(data);
          }catch(err : any){  
            return Promise.reject(err.response.data);
          }
    }
    async getUserInfo(token: String): Promise<Object> {
        try{
            const {data} = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            
            return Promise.resolve(data);
        }catch(err : any){
            return Promise.reject(err.response.data)
        } 
    }

}
 
export class GithubProvider implements Provider{
    
    private static clientId = process.env.GITHUB_CLIENT_ID;
    private static secret = process.env.GITHUB_CLIENT_SECRET;
    private static exchangeTokenUrl = "https://github.com/login/oauth/access_token";


    async exhangeCode(code: String): Promise<Object>{

          try{
            const {data}  = await axios.post(GithubProvider.exchangeTokenUrl,{
                client_id : GithubProvider.clientId,
                client_secret  : GithubProvider.secret,
                code,
                grant_type : "authorization_code",
                
            },{
                headers : {
                    Accept : "application/json"
                }
            })
           
            
            return Promise.resolve(data);
          }catch(err : any){ 
            return Promise.reject(err?.response.data);
          }
    }
    async getUserInfo(token: String): Promise<Object> {
        try{
            const {data} = await axios.get("https://api.github.com/user",{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            
            return Promise.resolve(data);
        }catch(err : any){
            return Promise.reject(err?.response.data)
        } 
    }

}