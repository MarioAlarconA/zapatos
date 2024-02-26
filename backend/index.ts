import { Server, ic } from 'azle';
import cors from "cors";
import express from 'express';

type Tshoe = {
    id:number;
    model:string;
    size:string;
    price:string;
}

let shoes: Tshoe[] = [
    {
        id:1,
        model:"Adidas Forum",
        size:"7",
        price:"$100"
    }
]
export default Server(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());


    app.post('/create',(req, res)=>{
        const shoe = shoes.find((shoe)=>shoe.id === parseInt(req.body.id));
        if(shoe){
            res.status(400).json({msg:"ID en uso.", data:shoe});
            return;
        }
        req.body.id = shoes[shoes.length - 1].id + 1;
        shoes.push(req.body);
        res.status(200).json({msg:"Modelo guerdado"});
    });

    app.get('/get',(req,res)=>{
        res.status(200).json({msg:"Modelos encontrados", data:shoes});
    });

    app.put('/update/:id', (req, res)=>{
        const shoe = shoes.find((shoe)=>shoe.id === parseInt(req.params.id));

        if(!shoe){
            res.status(404).json({msg:"Modelo no encontrado"});
            return;
        }

        const Ushoe = {...shoe, ...req.body};

        shoes = shoes.map((e) => e.id === Ushoe.id ? Ushoe : e);

        res.status(200).json({msg:"Modelo actualizado"});
    });

    app.delete('/delete/:id',(req, res)=>{
        shoes = shoes.filter((e) => e.id !== parseInt(req.params.id));
        res.status(200).json({msg:"Modelo elimindado", data:shoes});
    });



    app.post('/test', (req, res) => {
        res.json(req.body);
    });

    app.get('/whoami', (req, res) => {
        res.statusCode = 200;
        res.send(ic.caller());
    });

    app.get('/health', (req, res) => {
        res.send().statusCode = 204;
    });

    return app.listen();
});
