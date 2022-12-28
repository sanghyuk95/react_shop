import "./App.css";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import bg from "./img/shoe.jpg";
// 임포트 부터 하고 써야함 외부링크는 그냥가능
import { lazy, Suspense, useEffect, useState } from "react";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// import Cart from "./pages/Cart.js";
// import Detail from "./pages/Detail.js";

const Detail = lazy(() => import("./pages/Detail.js"));
const Cart = lazy(() => import("./pages/Cart.js"));

function App() {
  useEffect(() => {
    if (localStorage.getItem("watched")) {
      return;
    }
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [click, setClick] = useState(0);

  let result = useQuery(["작명"], () => {
    return axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
      console.log("요청됨");
      return a.data;
    });
    //{ staleTime: 2000 }   // 재요청 간격
  });

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              홈{" "}
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              {" "}
              상세페이지
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              {" "}
              cart
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            반가워요
            {result.isLoading ? "로딩중" : result.data.name}
          </Nav>
        </Container>
      </Navbar>
      
      <Suspense fallback={<div>로딩중임</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="main-bg" style={{ backgroundImage: "url(" + bg + ")" }}></div>
                <div className="container">
                  <div className="row">
                    {shoes.map((a, i) => {
                      return <Product shoes={shoes[i]} i={i} navigate={navigate} />;
                    })}
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (click > 1) {
                      alert("그만");
                      return;
                    }
                    setClick(click + 1);
                    axios.get(`https://codingapple1.github.io/shop/data${click + 2}.json`).then((result) => {
                      console.log(result.data);
                      let copy = [...shoes, ...result.data];
                      setShoes(copy);
                    });
                  }}
                >
                  더보기
                </button>
              </>
            }
          />
          <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </div>
  );
}

function Product(props) {
  return (
    <div className="col-md-4">
      <img
        src={"https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"}
        width="80%"
        onClick={() => {
          props.navigate("/detail/" + props.i + "");
        }}
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
