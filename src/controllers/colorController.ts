import {Request, Response} from 'express';
const Color = require('../models/color.model');

class ColorController{

    /*=== GET COLORS ===*/
    public async index(req: Request, res: Response){
        await Color.find((err: any, colors: any) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error cargando los colores',
                    errors: err
                });
            } else {
                res.status(200).json({
                    ok: true,
                    colors
                });
            }
        });
    }
    /*=== INSERT COLOR ===*/
    public async add(req: Request, res: Response){
        const body = req.body;

        const color = new Color({
            id: body.id,
            name  : body.name,
            color : body.color,
            state : 1
        });

        color.save(( err: any, colorSafe: any)=>{
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
            color.color = body.color;
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
                    ok: true
                });
            });
        });

    }

    /*=== GET COLOR BY ID ===*/
    public async getOne(req: Request, res: Response){
        await Color.findById(req.params.id, (err: any, color: any) =>{
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
            res.status(200).json({
                ok: true,
                color
            });
        });
    }
}

export const colorController = new ColorController();