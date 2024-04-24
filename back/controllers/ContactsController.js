import HttpError from "http-errors";
import Contacts from "../models/Contacts.js";
import {Massagers} from "../models/index.js";
import ContactsMassager from "../models/ContactsMassager.js";
import sequelize from "../services/sequelize.js";
import {Op} from "sequelize";

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

            const contact = await Contacts.create({address, email, phone, activeContact})

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
                                attributes: ["name", [sequelize.literal(`CONCAT('massagersIcon/', icon)`), 'icon']]
                            }
                        ]
                    },
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
            const {address, email, phone, activeContact, pathList = []} = req.body;
            const { id } = req.params;

            const contact = await Contacts.findOne({
                where: {id}
            })

            if (!contact) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await contact.update({address, email, phone, activeContact})

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
                                attributes: ["name", [sequelize.literal(`CONCAT('massagersIcon/', icon)`), 'icon']]
                            }
                        ]
                    },
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

            if (!contact) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await contact.destroy()

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
                                attributes: ["name", [sequelize.literal(`CONCAT('massagersIcon/', icon)`), 'icon']]
                            }
                        ]
                    },
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