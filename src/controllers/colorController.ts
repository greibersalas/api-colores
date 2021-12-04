import {Request, Response} from 'express';
import { createXml } from '../misc/createXml';
const Color = require('../models/color.model');

class ColorController{

    /*=== GET COLORS ===*/
    public async index(req: Request, res: Response){
        // Format return
        const format = req.query.format || 'json';
        // Number of page
        const page = Number(req.query.page) || 1;
        // Number of items per page
        const limit = Number(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        try {
            // Find cant colors
            const documents = await Color.countDocuments({state: 1});
            // Find colors
            const colors = await Color.find({ state: 1}).skip(skip).limit(limit).sort({_id: 1}).exec();
            if(format === 'json'){
                return res.status(200).json({
                    pages: Math.ceil(documents / limit),
                    page,
                    elements: colors.length,
                    colors
                });
            } else {
                res.header('Content-Type', 'application/xml');
                const xml = await createXml(colors);
                return res.status(200).send(xml);
            }
        } catch (error) {
            res.status(500).json({
                message: 'Error al cargar los colores',
            });
        }
    }
    /*=== INSERT COLOR ===*/
    public async add(req: Request, res: Response){
        const { id, name, year, color, pantone_value } = req.body;

        // Validations
        // Verificamos que el codigo que ingreso el usuario no exista
        const idsearc = await Color.findOne({id}).exec();
        if(idsearc){
            return res.status(400).json({
                ok: false,
                mensaje: 'El id que ingreso ya existe',
                errors: {message: 'El id que ingreso ya existe'}
            });
        }

        // Verificamos que el color que ingreso el usuario no exista
        const colorsearc = await Color.findOne({color}).exec();
        if(colorsearc){
            return res.status(400).json({
                ok: false,
                mensaje: 'El color que ingreso ya existe',
                errors: {message: 'El color que ingreso ya existe'}
            });
        }

        const colorAdd = new Color({
            id,
            name,
            year,
            color,
            pantone_value,
            state : 1
        });
        colorAdd.save(( err: any, colorSafe: any)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error al crear el color',
                    errors: err
                });
            }
            res.status(201).json(colorSafe);
        });
    }

    /*=== DELETE A COLOR ===*/
    public delete(req: Request, res: Response){
        const id  = req.params.id;
        Color.findById(id,( err: any, color: any)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error al buscar el color',
                    errors: err
                });
            }
            if(!color){
                return res.status(404).json({
                    ok: false,
                    mensaje: 'El color no existe',
                    errors: {message: 'No existe un color con ese id'}
                });
            }
            color.state   = 0;
            color.deleteAt = new Date();
            color.save((err: any, colorSave: any)=>{
                if(err){
                    return res.status(500).json({
                        ok: false,
                        mensaje:'Error al borrar el color',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true
                });
            });
        });

    }

    /*=== UPDATE A COLOR ===*/
    public async update(req: Request, res: Response){
        const body= req.body;
        const id  = req.params.id;

        Color.findById(id, (err: any, color: any)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error al buscar el color',
                    errors: err
                });
            }

            if(!color){
                return res.status(404).json({
                    ok: false,
                    mensaje:'El color no existe',
                    errors: {message: 'No existe un color con ese id'}
                });
            }

            color.name = body.name;
            color.year = body.year;
            color.color = body.color;
            color.pantone_value = body.pantone_value;
            color.updateAt = new Date();

            color.save(( err: any, colorSave: any)=>{
                if(err){
                    return res.status(500).json({
                        ok: false,
                        mensaje:'Error al actualizar el color',
                        errors: err
                    });
                }
                res.status(200).json({
                    color: colorSave
                });
            });
        });

    }

    /*=== GET COLOR BY ID ===*/
    public async getOne(req: Request, res: Response){
        // Format return
        const format = req.query.format || 'json';
        await Color.findById(req.params.id, async (err: any, color: any) =>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error al buscar el color',
                    errors: err
                });
            }
            if(!color){
                return res.status(404).json({
                    ok: false,
                    mensaje:'El color no existe',
                    errors: {message:'No existe un color con ese id'}
                });
            }
            if(format === 'json'){
                res.status(200).json(color);
            } else {
                res.header('Content-Type', 'application/xml');
                const xml = await createXml(color);
                res.status(200).send(xml);
            }
        });
    }
}

export const colorController = new ColorController();