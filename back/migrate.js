import {LoginImage, Users, UserSettings, HomeInfo, Welcome, Products} from "./models/index.js";
async function main(){
    await LoginImage.sync({alter:true, logging:true});
    await Users.sync({alter:true, logging:true});
    await UserSettings.sync({alter:true, logging:true});
    await HomeInfo.sync({alter:true, logging:true});
    await Welcome.sync({alter:true, logging:true});
    await Products.sync({alter:true, logging:true});

    process.exit(0);
}
main();