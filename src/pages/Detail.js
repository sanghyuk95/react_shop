import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Nav} from "react-bootstrap";

function Detail(props) {
  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let {id} = useParams();
  let [tap, setTap] = useState(0);

  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id;
  });

  useEffect(() => {
    //랜더링 후에 작동
    let a = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      // useEffect 전에 작동 보통 기존코드 치우는거 작성
      clearTimeout(a);
    };
  }, []);
  //대괄호 안은  useEffect 실행조건 (state 넣을시 변경될때마다 실행)
  //빈 대괄호는 처음 랜더링시에만 작동

  return (
    <div className="container">
      {alert == true ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : null}
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (parseInt(id) + 1) +
              ".jpg"
            }
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTap(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTap(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTap(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TapContent tap={tap} shoes={props.shoes}></TapContent>
    </div>
  );
}

function TapContent({tap,shoes}) {
  // if (tap === 0) {
  //   return<div>내용0</div>
  // }
  // if (tap === 1) {
  //   return<div>내용1</div>
  // }
  // if (tap === 2) {
  //   return<div>내용2</div>
  // }

  let [fade, setFade] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      setFade("");
    };
  }, [tap]);

  return (
    <div className={`start ${fade}`}>
      {[<div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>][tap]}
    </div>
  );
}

export default Detail;
