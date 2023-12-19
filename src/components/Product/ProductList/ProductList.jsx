import React from 'react';
import style from '../ProductList/ProductList.module.scss';
import { bestProducts } from '../../../data/BestProductData';
import { useEffect, useState } from 'react';
import BestProducts from '../../../pages/BestProducts/BestProducts';
import Pagination from '../../../pages/BestProducts/Pagination';
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from '../../../pages/BestProducts/LoadingSlice';
import { getListProductAdmin } from '../../../api/requests'; //나중에 편집하기


export default function ProductList({tag1, tag2, category}) {
   
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 12;
  const offset = (page - 1) * limit;
  let dispatch = useDispatch();
  
  useEffect(() => {
    async function getData() {
      try {
        dispatch(showLoading());
        const data = await getListProductAdmin();
        setProducts(data.filter(item => item.tags === tag1 || item.tags === tag2));
        dispatch(hideLoading());
      } catch {
        alert('상품 목록을 조회하지 못했습니다.');
      } finally {
        dispatch(hideLoading());
      }
    }
    getData();
  }, []);

    return (
        <div className={style.products}>
            <div className={style.container}>
                <div className={style.row}>
                    {products.slice(offset, offset + limit).map((products) => {
                        return <BestProducts key={products.id} products={products} />
                    })}
                </div>
            </div>
        </div>
    );
}