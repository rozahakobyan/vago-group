import {
    LoginImage,
    Users,
    UserSettings,
    HomeInfo,
    Welcome,
    Products,
    Partners,
    Achievements,
    Works,
    WorksSchedules,
    Contacts,
    ContactsMassager,
    Massagers,
    Prices,
    Packages,
    Projects,
    Galleries,
    VideoPath,
    Translation
} from "./models/index.js";

async function main(){
    await LoginImage.sync({alter:true, logging:true});
    await Users.sync({alter:true, logging:true});
    await UserSettings.sync({alter:true, logging:true});
    await HomeInfo.sync({alter:true, logging:true});
    await Welcome.sync({alter:true, logging:true});
    await Products.sync({alter:true, logging:true});
    await Partners.sync({alter:true, logging:true});
    await Achievements.sync({alter:true, logging:true});
    await Works.sync({alter:true, logging:true});
    await WorksSchedules.sync({alter:true, logging:true});
    await Massagers.sync({alter:true, logging:true});
    await Contacts.sync({alter:true, logging:true});
    await ContactsMassager.sync({alter:true, logging:true});
    await Prices.sync({alter:true, logging:true});
    await Packages.sync({alter:true, logging:true});
    await Projects.sync({alter:true, logging:true});
    await Galleries.sync({alter:true, logging:true});
    await VideoPath.sync({alter:true, logging:true});
    await Translation.sync({alter:true, logging:true});

    process.exit(0);
}
main();