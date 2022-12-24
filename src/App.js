import "./App.css";
import {Navbar, Container, Nav, Row, Col} from "react-bootstrap";
import bg from "./img/shoe.jpg";
// 임포트 부터 하고 써야함 외부링크는 그냥가능
import {useState} from "react";
import data from "./data.js";
import Detail from "./pages/Detail";
import {Routes, Route, Link, useNavigate, Outlet} from "react-router-dom";
import axios from "axios";

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [click, setClick] = useState(0);

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
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div
                className="main-bg"
                style={{backgroundImage: "url(" + bg + ")"}}
              ></div>
              <div className="container">
                <div className="row">
                  {shoes.map((a, i) => {
                    return (
                      <Product shoes={shoes[i]} i={i} navigate={navigate} />
                    );
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
                  axios
                    .get(
                      `https://codingapple1.github.io/shop/data${
                        click + 2
                      }.json`
                    )
                    .then((result) => {
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
        <Route path="*" element={<div>404</div>} />
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
      </Routes>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
      {/* nestde routes 의 element 보여주는곳은 <Outlet> */}
    </div>
  );
}

function Product(props) {
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
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
