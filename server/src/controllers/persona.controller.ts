import {Request,Response} from 'express';
import connection from '../db/connection';


export const getPersonas = (req: Request,res: Response) =>{
    connection.query('SELECT * FROM persona',(err,data) =>{
        if(err) throw err;
        res.json(data)

    })
    
    
    
}
//Creación de los endpoints
export const getPersona = (req: Request,res: Response)=>{

    const { id } = req.params;

    connection.query('SELECT * FROM persona WHERE id= ?', id,(err,data) =>{
        if(err) throw err;
        /*res.json(data)*/
        res.json(data[0])

    })
    
}

export const deletePersona = (req: Request,res: Response)=>{
    const { id } = req.params;

    connection.query('DELETE FROM persona WHERE id = ?',id,(err,data) => {
        if(err) throw err;
        res.json({
            msg:'Persona Eliminada Correctamente'
        })
    })

    
   
}


export const postPersona = (req: Request,res: Response)=>{
   const { body } = req;

   connection.query('INSERT INTO persona set ?',[body],(err,data) => {
    if(err) throw err;
    res.json({
        msg:'Persona Agregada Correctamente'
    })
})
   
}

export const putPersona = (req: Request,res: Response)=>{
    const { body } = req;
    const { id } = req.params;
    
    connection.query('UPDATE persona SET ? WHERE id = ?',[body,id],(err,data) =>{
        if(err) throw err;

        res.json({
            msg:'Persona Actualizada Exitosamente'
        })

    })
}