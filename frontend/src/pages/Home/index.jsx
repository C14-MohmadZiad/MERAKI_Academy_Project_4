import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { setProducts } from "../../redux/productSlice";
import "./style.css";

const dispatch = useDispatch();
const items =useSelector((state)=> {
    state.products.items
})

useEffect(()=>{
api.get("/products")
.then((res)=>{
    dispatch(setProducts(res.data))
})
.catch((err)=>{
    console.error(err);
    
});

},[dispatch])

return 