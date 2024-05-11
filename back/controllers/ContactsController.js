import HttpError from "http-errors";
import Contacts from "../models/Contacts.js";
import {Massagers} from "../models/index.js";
import ContactsMassager from "../models/ContactsMassager.js";
import sequelize from "../services/sequelize.js";
import {Op} from "sequelize";
import Translation from "../models/Translation.js";

class ContactsController {
    static async add (req, res, next){
        try{
            const {address, email, phone, activeContact, pathList = []} = req.body;

            if(!address || !email || !phone){
                throw HttpError(404, {
                    errors: {
                        exists: "Not found"
                    }
                })
            }

            const translation = await Translation.create({
                en: {
                    address: address.en
                },
                ru: {
                    address: address.ru
                },
                am: {
                    address: address.am
                },
                pl: {
                    address: address.pl
                },
            })

            const contact = await Contacts.create({address: address.en,
                email, phone, activeContact, translationId: translation.id})

            if(pathList.length){
                await ContactsMassager.bulkCreate(pathList.map(p => ({
                    contactId: contact.id,
                    massagerId: p.massagerId,
                    path: p.path
                })))
            }
            
            const createdContact = await Contacts.findOne({
                where: { id: contact.id },
                include: [
                    {
                        model: ContactsMassager,
                        as: "massagersList",
                        required: false,
                        attributes: ["path"],
                        include: [
                            {
                                model: Massagers,
                                as: "massager",
                                required: false,
                                attributes: ["name", [sequelize.literal(`CONCAT('massagersIcon/', headerIcon)`), 'headerIcon'],
                                    [sequelize.literal(`CONCAT('massagersIcon/', footerIcon)`), 'footerIcon']]
                            }
                        ]
                    },{
                        model: Translation,
                        required: false,
                    }
                ],
                attributes: ["id", "address", "phone", "email", "activeContact"]
            })

            res.json({
                status: "ok",
                contact: createdContact
            })
        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {address, email, phone, translation, activeContact, pathList = []} = req.body;
            const { id } = req.params;

            const contact = await Contacts.findOne({
                where: {id}
            })
            const translations = await Translation.findByPk(contact.translationId);

            if (!contact) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            if (!translations) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await contact.update({address: translation.en.address, email, phone, activeContact})
            await translations.update(translation)

            if(pathList){
                await ContactsMassager.bulkCreate(pathList.map(p => ({
                    contactId: contact.id,
                    massagerId: p.massagerId,
                    path: p.path
                })))
            }

            const updatedContact = await Contacts.findOne({
                where: { id: contact.id },
                include: [
                    {
                        model: ContactsMassager,
                        as: "massagersList",
                        required: false,
                        attributes: ["path"],
                        include: [
                            {
                                model: Massagers,
                                as: "massager",
                                required: false,
                                attributes: ["name", [sequelize.literal(`CONCAT('massagersIcon/', headerIcon)`), 'headerIcon'],
                                    [sequelize.literal(`CONCAT('massagersIcon/', footerIcon)`), 'footerIcon']]
                            }
                        ]
                    },{
                        model: Translation,
                        required: false,
                    }
                ],
                attributes: ["id", "address", "phone", "email", "activeContact"]
            })

            res.json({
                status: "ok",
                contact: updatedContact
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const { id } = req.params;

            const contact = await Contacts.findByPk(id)
            const translation = await Translation.findByPk(contact.translationId);

            if (!contact) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            if (!translation) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await contact.destroy()
            await translation.destroy()

            res.json({
                status: "ok"
            })
        }catch (e) {
            next(e)
        }
    }

    static async updatePathMassager (req, res, next){
        try{
            const {path, massagerId, contactId} = req.body;
            const {id} = req.params;

            const pathMassager = await ContactsMassager.findOne({
                where: {id}
            })

            if (!pathMassager) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await pathMassager.update({path, massagerId, contactId})

            res.json({
                status: "ok",
                path: pathMassager
            })
        }catch (e) {
            next(e)
        }
    }

    static async deletePathMassager (req, res, next){
        try{
            const {id} = req.params;

            const path = await ContactsMassager.findOne({
                where: {id}
            })

            if (!path) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await path.destroy();

            res.json({
                status: "ok"
            })
        }catch (e) {
            next(e)
        }
    }

    static async list (req, res, next){
        try{
            const contacts = await Contacts.findAll({
                include: [
                    {
                        model: ContactsMassager,
                        as: "massagersList",
                        required: false,
                        attributes: ["path", "id"],
                        include: [
                            {
                                model: Massagers,
                                as: "massager",
                                required: false,
                                attributes: ["name", [sequelize.literal(`CONCAT('massagersIcon/', headerIcon)`), 'headerIcon'],
                                    [sequelize.literal(`CONCAT('massagersIcon/', footerIcon)`), 'footerIcon']]
                            }
                        ]
                    },{
                        model: Translation,
                        required: false,
                    }
                ],
                attributes: ["id", "address", "phone", "email", "activeContact"]
            })

            res.json({
                status: "ok",
                contacts,
            })
        }catch (e) {
            next(e)
        }
    }
}

export default ContactsController;