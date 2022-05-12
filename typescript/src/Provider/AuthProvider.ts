import {GmailProvider, Provider, GithubProvider} from "./Provider";
class AuthProvider{
    private authProvider : Provider 
    
    constructor(provider : Provider){
        this.authProvider = provider
    }
 

    async getAccessToken(code : string) : Promise<String>{
        try{
          const token : any = await this.authProvider.exhangeCode(code)
      
          return Promise.resolve(token?.access_token)
        }catch(err){
            return Promise.reject(err)
        }
    }

    async getUserInfo(token : String) : Promise<Object>{
        try{
            const user = await this.authProvider.getUserInfo(token)
           
            return Promise.resolve(user)
          }catch(err){
              return Promise.reject(err)
          }
    }


}

export enum PROVIDER {
    GMAIL_PROVIDER = "GMAIL_PROVIDER",
    GITHUB_PROVIDER = "GITHUB_PROVIDER"
}

 
export class AuthFactory{
    static GetAuthProvider(authProvider : PROVIDER) {
         if(authProvider == PROVIDER.GMAIL_PROVIDER){
             return new AuthProvider(new GmailProvider());
         }else if(authProvider == PROVIDER.GITHUB_PROVIDER){
             return new AuthProvider(new GithubProvider())
         } 
    }
}
 