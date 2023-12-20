import React, { Component } from "react";
import CategoryFilter from "./CategoryFilter";
import "../BestProducts/BestProductList.module.scss"

//  fetch("../../data/BestProductsData/FilterBar.json",




class BestProductList extends Component {
  constructor() {
    super();
    this.state = {
      isfitlerDropMenu: false,
      isOrderDropMenu: false,
      filteredList: [],
      btnIdx: 99,
      order: "인기순",
      productList: { products: [] }, // productList를 객체로 초기화
    };
  }

  componentDidMount() {
    fetch("../../data/BestProductsData/FilteredBar.json", {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        // 초기 데이터 설정은 setState의 콜백 함수로 이동합니다.
        //체크중 지우기
        console.log('data componentdata에 옴?', data  )
        this.setState(
          { filteredList: data },
          () => {
            // onDataRequest 함수를 호출합니다.
            this.onDataRequest();
          }
        );
      })
      .catch((error) => {
        this.setState({
          productList: { products: [] },
        });
      });
  }
  



  onDataRequest = () => {
    // 정적인 JSON 파일을 불러오기
    console.log("onDataRequest 함수 호출됨"); // 추가된 디버깅 메시지 지우기
    fetch('/data/BestProductList.json')
      .then((response) => {
        console.log('HTTP 상태 코드:', response.status); // HTTP 상태 코드 출력
        console.log(response);  // 응답 객체 전체를 콘솔에 출력 테스트중
        return response.json()})
      .then((data) => {
        const transformedData = data.map((product) => {
          return {
            item_code: product.item_code.toString(), // Assuming 'item_code' exists in your data
            option_code: product.option_code ? product.option_code.toString() : "", // Assuming 'option_code' exists in your data
            unit_price: product.unit_price,
            stock_quantity: 100,
            image_path_1: product.image_path_1,
            view_count: product.view_count,
            start_date: product.start_date,
            end_date: product.end_date,
          };
        });
  
        // 추출된 count 값
        const count = data.length;
  
        this.setState({
          productList: { count, products: transformedData },
        });
  
        // Debugging: 콘솔에 productList 출력
        console.log('data 확인중', data)
        console.log('transformedData 확인중', transformedData)

      
      });
  };

  // filterDropMenuOnOff = (idx) => {
  //   this.setState({
  //     isfitlerDropMenu: !this.state.isfitlerDropMenu,
  //     btnIdx: idx,
  //   });
  // };

  // productOrderOnOff = () => {
  //   this.setState({
  //     isOrderDropMenu: !this.state.isOrderDropMenu,
  //   });
  // };

  // orderFilter = (e) => {
  //   const order = e.target.value;
  //   this.props.onDateOrderdRequest(order);
  //   this.setState({
  //     order: e.target.innerText,
  //     isOrderDropMenu: false,
  //   });
  // };

  // categoryFilter = (e) => {
  //   const filter = Number(e.target.value) + 1;
  //   const filterName = e.target.name;
  //   this.props.onDateFilterRequest(filter, filterName);
  // };




  render() {
   
    const {
      filteredList,
      isOrderDropMenu,
      isfitlerDropMenu,
      btnIdx,
      order,
      productList,  // 이 부분 추가
    } = this.state; // state에서 가져옴

    return (
    
      <div className="itemList">
        <div className="categoryFilter">
          {filteredList.categories?.map((category, idx) => {
            return (
              <div className="filterBar">
                <button key={idx} value={idx}>
                  {/* <span onClick={() => this.filterDropMenuOnOff(idx)}>
                    {category.categoryName}
                  </span> */}
                  <span className="btnArrow"> ∨ </span>
                  <div className="subfilterBar">
                    {isfitlerDropMenu && idx === btnIdx && (
                      <div className="subfilterList">
                        {category.category.map((subFilter, idx) => {
                          return (
                            <div key={idx}>
                              <button
                                className="subfilterName"
                                // onClick={(e) => this.categoryFilter(e)}
                                value={idx}
                                name="size"
                              >
                                {subFilter}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
        <div className="itemFilterd">
          <div className="itemCountedNum">
          <span>전체  productList.products.length 확인중 { productList.products.length}개</span>
          </div>
          <div className="orderFilter">
            <button onClick={(e) => this.productOrderOnOff(e)}>
              {order}
              <div>▼</div>
            </button>
            <div>
              {isOrderDropMenu && (
                <div className="orderPanel">
                  <button value="recent" onClick={(e) => this.orderFilter(e)}>
                    최신순
                  </button>
                  <button value="old" onClick={(e) => this.orderFilter(e)}>
                    오래된순
                  </button>
                  <button
                    value="max_price"
                    onClick={(e) => this.orderFilter(e)}
                  >
                    높은가격순
                  </button>
                  <button
                    value="min_price"
                    onClick={(e) => this.orderFilter(e)}
                  >
                    낮은가격순
                  </button>
                  <button value="review" onClick={(e) => this.orderFilter(e)}>
                    많은리뷰순
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <ul>
          {productList.products &&
            productList.products.map((product) => {
              console.log(product); // 디버깅을 위해 상품 객체를 콘솔에 출력 지울 것
              return (
                <div className="item" key={product.item_code}>
                  <div className="itemImg">
                    <img
                      alt="상품"
                      src={product.image_path_1}
                      // onClick={() => gotoDetail(product.id)}
                    />
                  </div>
                  <div className="itemContent">
                    <h1 className="itemName">{product.option_code}</h1>
                    <div className="priceInfo">
                      <span className="discount">
                        {product.unit_price}
                        <span>%</span>
                      </span>
                      <span className="price">
                        {(product.unit_price - "").toLocaleString()}
                      </span>
                    </div>
                    <div className="itemEvaluation">
                      <span className="avg">
                        <span>★</span>
                      </span>
                      <div className="review">
                        <span>리뷰</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default BestProductList;
