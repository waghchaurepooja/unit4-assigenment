
const express = require("express");

const client = require("../configs/redis");

const Product1 = require("../models/product.model");

const router = express.Router();

router.post("", async(req,res) =>
{
    try
    {
        const Product = await Product1.create(req.body);

        const products = await Product1.find().lean().exec();
        
        client.set("products", JSON.stringify(products));
        
        return res.status(201).send({Product : Product});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
})

router.get("", async(req,res) =>
{
    try
    {
        client.get("products", async function(err,fetchedProducts)
        {
            console.log('fetchedProducts:', fetchedProducts)

            if(fetchedProducts)
            {
                const Products = JSON.parse(fetchedProducts);
                return res.status(200).send({Products : Products, redis : true});
            }
            else
            {
                try
                {
                    const products = await Product1.find().lean().exec();
                    
                    client.set("products", JSON.stringify(products));
                    
                    return res.status(200).send({products : products, redis : false});
                }
                catch(error)
                {
                    return res.status(500).send({message : error.message});
                }
            }
        })
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
});

router.get("/:id", async(req,res) =>
{
    try
    {
        client.get(`products.${req.params.id}`, async function(err, fetchedProduct)
        {
            console.log('fetchedProduct:', fetchedProduct)
            if(fetchedProduct)
            {
                const Products = JSON.parse(fetchedProduct);

                return res.status(200).send({Products : Products, redis : true});
            }
            else
            {
                try
                {
                    const products = await Product1.findById(req.params.id).lean().exec();

                    client.set(`products.${req.params.id}`, JSON.stringify(products));

                    return res.status(200).send({products : products, redis : false});
                }
                catch(error)
                {
                    return res.status(500).send({message : error.message});
                }
            }
        })
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
});

router.patch("/:id", async(req,res) =>
{
    try
    {
        const Product = await Product1.findByIdAndUpdate(req.params.id, req.body, {new : true}).lean().exec();

        const products = await Product1.find().lean().exec();
        
        client.set(`products.${req.params.id}`, JSON.stringify(Product));

        client.set("products", JSON.stringify(products));

        return res.status(202).send({Product : Product});

    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
})

router.delete("/:id", async(req,res) =>
{
    try
    {
        const Product = await Product1.findByIdAndDelete(req.params.id).lean().exec();

        const products = await Product1.find().lean().exec();

        client.del(`products.${req.params.id}`);
        
        client.set("products", JSON.stringify(products));

        return res.status(202).send({Product : Product});

    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
})

module.exports = router;