 import React, { useState, useEffect } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { withRouter, Link, Redirect } from "react-router-dom";
import { Row, Col, Icon, Card, Modal, Divider } from "antd";
import axios from 'axios';
import './MyPageBanner.css?ver=1';
import Banner from '../Home/Banner.js';

export default function MyPageBanner() {
  const [name, setName] = useState("");
  const [likeList, setLikeList] = useState([]);
  const [buyList, setBuyList] = useState([]);
  const [sellList, setSellList] = useState([]);

  const [likeProduct, setLikeProduct] = useState(true);
  const [buyProduct, setBuyProduct] = useState(false);
  const [sellProduct, setSellProduct] = useState(false);
  const [dirDetailCard, setDirDetailCard] = useState(false);
  const [boxDetailCard, setBoxDetailCard] = useState(false);
  const [boxActiveIndex, setBoxActiveIndex] = useState(-1);
  const [dirActiveIndex, setDirActiveIndex] = useState(-1);

  const [level, setLevel] = useState(false);
  const [modal, setModal] = useState(false);
  const [boogleBank, setBoogleBank] = useState(false);
  const [sellerBank, setSellerBank] = useState(false);

  const [needRender, setNeedRender] = useState(false);

  // const[directStep, setDirectStep] = useState("");
  // const[boxStep, setBoxStep] = useState("");


  useEffect(() => {
    getMyPage();
  }, []);

  useEffect(() => {
    if(needRender) {
      getMyPage();
      setNeedRender(false)
    }
  }, [needRender]);

  const getMyPage = () => {
    axios.get('http://13.124.113.72:8080/myPage', {
      headers: { Authorization: localStorage.getItem('token') }
    })
      .then((response) => {
        console.log(response);
        setName(response.data.data.userName)
        setLikeList(response.data.data.bookmarkedItemList)
        setBuyList(response.data.data.buyTransList)
        setSellList(response.data.data.sellTransList)
      });
  }

    const acceptBuyRequest = (sellItemId) => {
      axios.get('http://13.124.113.72:8080/transaction/step?sellItemId=' + sellItemId, {
      })
        .then((response) => {
            setNeedRender(true);
        });
    }

    const rejectBuyRequest = (sellItemId) => {
      axios.delete('http://13.124.113.72:8080/transaction?sellItemId=' + sellItemId, {
      })
        .then((response) => {
            setNeedRender(true);
        });
    }

  const completePayment = (sellItemId) => {
    axios.get('http://13.124.113.72:8080/transaction/payment?sellItemId=' + sellItemId, {
    })
      .then((response) => {
          setNeedRender(true);
      });    
  }

  const setBoogleBoxInfo = (boxId, boxPassword, sellItemId) => {

    axios.post('http://13.124.113.72:8080/transaction/booglebox', {
      "sellItemId" : sellItemId,
      "id" : boxId,
      "password" : boxPassword
    })
      .then((response) => {
          setNeedRender(true);
      });    

  }

  const changeTransactionStep = (sellItemId) => {

    axios.get('http://13.124.113.72:8080/transaction/step?sellItemId=' + sellItemId, {
      headers: { Authorization: localStorage.getItem('token') }
    })

      .then((response) => {
        console.log(response);
      });

  }

  const setBoogleBoxInfoOnClickHandler = (boxId, boxPassword, sellItemId) => {
    setBoogleBoxInfo(boxId, boxPassword, sellItemId);
  }

  const payConfirmOnClickHandler = (sellItemId) => {
    completePayment(sellItemId)
  }

  const viewLikeProduct = e => {
    setLikeProduct(true);
    setBuyProduct(false);
    setSellProduct(false);
  }

  const viewBuyProduct = e => {
    setLikeProduct(false);
    setBuyProduct(true);
    setSellProduct(false);
  }

  const viewSellProduct = e => {
    setLikeProduct(false);
    setBuyProduct(false);
    setSellProduct(true);
  }

  const showModal = e => {
    setModal(true);
  }

  const closeModal = e => {
    setModal(false);
  }

  const showLevel = e => {
    setLevel(true);
    setBoogleBank(false);
    setSellerBank(false);
  }

  const showBoogleBank = e => {
    setLevel(false);
    setBoogleBank(true);
    setSellerBank(false);
  }

  const showSellerBank = e => {
    setLevel(false);
    setBoogleBank(false);
    setSellerBank(true);
  }


  return (
    <div style={{
      background: "url(https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/banner_background.png)",
      height: "100vh", backgroundSize: "cover"
      , paddingTop: "1vh"
    }} className="mypage">
      <Row style={{ top: 10, marginBottom: "1vh" }}>
        <Col xs={{ span: 3 }}>
          <Link to="/">
            <img style={{
              width: "32px",
              height: "auto",
              marginLeft: "40%",
              filter: "brightness(0) invert(1)"
            }}
              src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png" />
          </Link>
        </Col>
        <Col xs={{ span: 8, offset: 5 }}>
          <h5 style={{ color: "white" }}>
            마이페이지
                        </h5>
        </Col>
        <Link to='/'>
          <Col xs={{ span: 3, offset: 5 }}>
          </Col>
        </Link>
      </Row>
      <Row style={{ marginTop: "7vh" }}>
        <Col>
          {/* <Icon style={{
                color: "#ffffff",
                fontSize: "10vh",
                marginLeft: "42%",
                marginTop: "10%",
              }} type="question-circle"
              id="profile-circle"
              onClick = {() => {}}
              /> 지금은 텍스트, 나중엔 이미지*/}
          <Icon style={{
            color: "#ffffff",
            fontSize: "10vh",
          }} type="question-circle"
            id="profile-circle"
            onClick={() => { showModal(); showLevel(); }}
          />
        </Col>
        {modal == true ?
          <Modal
            visible={modal}
            onOk={() => { closeModal(); }}
            onCancel={() => { closeModal(); }}>
            {level == true ?
              <p>User Level Image</p>
              : null}
          </Modal>
          : null}
      </Row>
      <Row style={{ marginTop: "5vh" }}>
        <label style={{ color: "#ffffff" }}>{name}님, 안녕하세요!</label>
      </Row>

      <Row>
        <Col xs={{ span: 4, offset: 6 }}>
          <Row>
            <Col xs={{ span: 24 }}>
              <Icon style={{
                color: "#ffffff",
                fontSize: "3vh",
              }} type="bell"
                onClick={() => { }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }}>
              <label style={{
                color: "#ffffff",
                fontSize: "2vh"
              }}>
                공지사항
                  </label>
            </Col>
          </Row>
        </Col>
        <Link to='/customercenter'>
          <Col xs={{ span: 4 }}>
            <Row>
              <Col xs={{ span: 24 }}>
                <Icon style={{
                  color: "#ffffff",
                  fontSize: "3vh",
                }} type="phone"
                  onClick={() => { }}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 24 }}>
                <label style={{
                  color: "#ffffff",
                  fontSize: "2vh"
                }}>
                  고객센터
                  </label >
              </Col>
            </Row>
          </Col>
        </Link>
        <Col xs={{ span: 4 }}>
          <Row>
            <Col xs={{ span: 24 }}>
              <Icon style={{
                color: "#ffffff",
                fontSize: "3vh",
              }} type="setting"
                onClick={() => { }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }}>
              <label style={{
                color: "#ffffff",
                fontSize: "2vh"
              }}>
                설정
                  </label>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ marginTop: "5vh" }}>
        <Col xs={{ span: 6, offset: 3 }}>
          <Row>
            <Col span={24}>
              {likeProduct == true ?
                <Icon style={{
                  color: "#ffffff",
                  fontSize: "5vh",
                }} type="heart"
                  theme="filled"
                  onClick={() => { viewLikeProduct(); }}
                />
                :
                <Icon style={{
                  color: "#ffffff",
                  fontSize: "5vh",
                }} type="heart"
                  onClick={() => { viewLikeProduct(); }}
                />
              }
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <small style={{
                color: "#ffffff",
                fontSize: "2vh"
              }}>
                관심상품
                    </small>
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 6 }}>
          <Row>
            <Col span={24}>
              {buyProduct == true ?
                <Icon style={{
                  color: "#ffffff",
                  fontSize: "5vh",
                }} type="heart"
                  theme="filled"
                  onClick={() => { viewBuyProduct();
                  setDirDetailCard(false); setBoxDetailCard(false); }}
                />
                :
                <Icon style={{
                  color: "#ffffff",
                  fontSize: "5vh",
                }} type="heart"
                  onClick={() => { viewBuyProduct(); 
                  setDirDetailCard(false); setBoxDetailCard(false);}}
                />
              }
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <small style={{
                color: "#ffffff",
                fontSize: "2vh"
              }}>
                구매현황
                    </small>
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 6 }}>
          <Row>
            <Col span={24}>
              {sellProduct == true ?
                <Icon style={{
                  color: "#ffffff",
                  fontSize: "5vh",
                }} type="heart"
                  theme="filled"
                  onClick={() => { viewSellProduct(); 
                    setDirDetailCard(false); setBoxDetailCard(false);}}
                />
                :
                <Icon style={{
                  color: "#ffffff",
                  fontSize: "5vh",
                }} type="heart"
                  onClick={() => { viewSellProduct(); 
                    setDirDetailCard(false); setBoxDetailCard(false);}}
                />
              }
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <small style={{
                color: "#ffffff",
                fontSize: "2vh"
              }}>
                판매현황
                    </small>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row id="user-product"
        style={{ marginTop: "5%", height: "45%" }}>
        {likeProduct == true ?
          <Card style={{ width: "100%", backgroundColor: "#ffffff", border: 0, paddingBottom: "15vh" }}>
            {likeList.length != 0 ?
              <div>
                <Row>
                  {likeList.map((value, index) => (

                    <Col span={7} offset={1}>
                      <Row>
                        <Col span={24}>
                          <Link to = {'/buy/detail/'+value.sellItemId}>
                          <img style={{ width: "10vh", height: "15vh", backgroundSize: "contain", borderRadius: "7px" }}
                            src={value.imageUrl}></img>
                          </Link>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <label style={{ marginTop: "1vh", marginBottom: "-1vh", fontSize: "2vh" }}>
                            {value.title}</label>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} style={{ marginBottom: "2vh" }}>
                          <label style={{ fontSize: "2vh", color: "rgba(51, 158, 172, 0.9)" }}>{value.regiPrice}원</label>
                        </Col>
                      </Row>
                    </Col>

                  ))}
                </Row>
                <Row>
                  <Link to="/">
                    <button style={{
                      padding: "0",
                      width: "100%",
                      background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                      border: "none", borderRadius: "2.25vh", fontSize: "2.5vh", height: "5vh"
                    }}
                    >더 담으러 가기</button>
                  </Link>
                </Row>
              </div>
              :
              <div>
                <Row style={{ padding: "2vh", margin: "2vh", marginBottom: "50%" }}>
                  <p style={{ color: "#000000", fontSize: "2vh" }}>관심상품이 없습니다.</p>
                </Row>
                <Row>
                  <Link to="/">
                    <button style={{
                      padding: "0",
                      width: "100%",
                      background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                      border: "none", borderRadius: "2.25vh", fontSize: "2.5vh", height: "5vh"
                    }}
                    >더 담으러 가기</button>
                  </Link>
                </Row>
              </div>
            }
          </Card>
          : null} {/* likeProduct != true 일 때는 null */}

        {buyProduct == true ?
          <Card style={{ width: "100%", backgroundColor: "#ffffff", border: 0}}>
            {buyList.length != 0 && buyList != null ?
              buyList.map((value, index) => (
                <div style={{ width: "95%", margin: "auto auto", padding: "0px" }}>
                  {value.transactionType == 0 ?
                    <Card class = "product-card"
                    style={{
                      width: "100%", height: "40%", backgroundColor: "#e5fdfc",
                      border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                      margin: "auto auto", marginBottom: "2vh", padding: "0px",
                    }}>
                      <div style={{margin: "-24px"}}>
                      <Row style={{padding: "0"}}>
                        <Col span={4} offset={20} style={{ color: "#339eac", fontSize: "10pt" }}>직거래</Col>
                      </Row>

                      {value.transactionStep == 0 ?
                        <div>
                          <Row>
                            <Col span={6} offset={0}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img style={{
                                width: "10vh", height: "15vh", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }} src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={1}>
                              <Row style={{ fontStyle: "bold", fontSize: "15px", textAlign: "left",
                            color: "#656565" }}>
                                <Col offset={0}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "12px", color: "#656565", }}>
                                <Col span={12}>
                                  주문일자 : {/*나중에 수정하기*/}
                                  {value.transactionCreatedTime[2]}
                                  {value.transactionCreatedTime[3]}.
                                  {value.transactionCreatedTime[5]}
                                  {value.transactionCreatedTime[6]}.
                                  {value.transactionCreatedTime[8]}
                                  {value.transactionCreatedTime[9]}
                                </Col>
                                <Col span={12}> | 판매가격 : {value.transPrice}원
                              </Col>
                              </Row>
                              <Row style={{ fontSize: "15px", color: "#959595", marginTop: "2vh" }}>
                                <Col offset={3}>
                                  판매자 수락 대기 중
                              </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                        : 
                        <div>
                        <Row>
                            <Col span={6} offset={0}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img style={{
                                width: "10vh", height: "15vh", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }} src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={1}>
                            <Row style={{ fontStyle: "bold", fontSize: "15px", textAlign: "left",
                            color: "#656565" }}>
                                <Col offset={0}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "12px", color: "#656565", }}>
                                <Col span={12}>
                                  주문일자 : {/*나중에 수정하기*/}
                                  {value.transactionCreatedTime[2]}
                                  {value.transactionCreatedTime[3]}.
                                  {value.transactionCreatedTime[5]}
                                  {value.transactionCreatedTime[6]}.
                                  {value.transactionCreatedTime[8]}
                                  {value.transactionCreatedTime[9]}
                                </Col>
                                <Col span={12}> | 판매가격 : {value.transPrice}원
                              </Col>
                              </Row>
                            <Row style={{ fontSize: "12px", color: "#656565", marginTop: "2vh" }}>
                                <Col offset={0} style={{ fontStyle: "bold" }}>
                                  판매자 : {value.traderName} |
                                  연락처 : {value.traderPhoneNumber}
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row style={{ fontSize: "12px", color: "#656565", marginTop: "4vh" }}>
                              {dirDetailCard == true && dirActiveIndex == index ?
                                <Col offset={20}>
                                <label onClick={() => { setDirDetailCard(false) }}>접기</label>
                                </Col>
                                :
                                <Col offset={16}>
                                <label onClick={() => { setDirDetailCard(true); 
                                  setDirActiveIndex(index) }}>거래상세보기</label>
                                </Col>
                              }
                          </Row>
                        {dirDetailCard == true && dirActiveIndex == index ?
                          <div style={{fontSize: "15px"}}>
                            <Row style={{ margin: "2vh", color: "#44a0ac" }}>
                              판매자 수락
                            </Row>
                            <Row style={{ fontSize: "10vh", margin: "2vh", color: "#0396cf" }}>
                                <Icon type="line" rotate="90" />
                            </Row>
                            {value.transactionStep == 2 || value.transactionStep > 2 ?
                            <Row style={{ marginTop: "2vh", color: "#038196" }}>
                              거래중
                            </Row>
                            :
                            <Row style={{ marginTop: "2vh", color: "gray" }}>
                              거래중
                            </Row>
                            }
                            {value.transactionStep == 3 ?
                            <div>
                              <Row style={{ fontSize: "5vh", margin: "2vh", color: "#0396cf" }}>
                                <Icon type="line" rotate="90" />
                              </Row>
                              <Row style={{ marginTop: "2vh", color: "#0396cf" }}>
                                거래 완료
                              </Row>
                            </div>
                            :
                            <div>
                            <Row style={{ fontSize: "5vh", margin: "2vh", color: "gray" }}>
                              <Icon type="line" rotate="90" />
                            </Row>
                            <Row style={{ marginTop: "2vh", color: "gray" }}>
                              거래 완료
                            </Row>
                            </div>
                            } {/*직거래 3단계*/}
                            
                          </div>
                          : null } {/*직거래 step들*/}
                      </div>
                    }
                    </div>
                    </Card>
                    :
                    <Card style={{
                      width: "100%", height: "40%", backgroundColor: "#e8f5ff",
                      marginBottom: "2vh", border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                      padding: "2vh",
                    }}>
                      <Row>
                        <Col span={7} offset={5}> </Col>
                        <Col span={7} offset={5} style={{ color: "#0b308e", fontSize: "12pt" }}>북을박스</Col>
                      </Row>
                      {value.transactionStep == 0 ?
                        <div>
                          <Row>
                            <Col span={6} offset={0}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img style={{
                                width: "10vh", height: "15vh", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }} src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={1}>
                              <Row style={{ fontStyle: "bold", fontSize: "12pt", textAlign: "left" }}>
                                <Col offset={0}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "8pt", color: "gray", }}>
                                <Col span={12}>
                                  주문일자 : {/*나중에 수정하기*/}
                                  {value.transactionCreatedTime[2]}
                                  {value.transactionCreatedTime[3]}.
                                  {value.transactionCreatedTime[5]}
                                  {value.transactionCreatedTime[6]}.
                                  {value.transactionCreatedTime[8]}
                                  {value.transactionCreatedTime[9]}
                                </Col>
                                <Col span={12}> | 판매가격 : {value.transPrice}원
                              </Col>
                              </Row>
                              <Row style={{ fontSize: "12pt", color: "gray", marginTop: "2vh" }}>
                                <Col offset={3}>
                                  판매자 수락 대기 중
                              </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>

                        : /*구매상품의 step이 0일 때와 아닐 때(판매자 수락 전, 후)*/

                        <div style={{ fontSize: "12pt", fontStyle: "bold" }}>
                          <Row>
                            <Col span={6} offset={0}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img style={{
                                width: "10vh", height: "15vh", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }} src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={1}>
                              <Row style={{ fontStyle: "bold", fontSize: "12pt", textAlign: "left" }}>
                                <Col offset={0}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "8pt", color: "gray", }}>
                                <Col span={12}>
                                  주문일자 : {/*나중에 수정하기*/}
                                  {value.transactionCreatedTime[2]}
                                  {value.transactionCreatedTime[3]}.
                                  {value.transactionCreatedTime[5]}
                                  {value.transactionCreatedTime[6]}.
                                  {value.transactionCreatedTime[8]}
                                  {value.transactionCreatedTime[9]}
                                </Col>
                                <Col span={12}> | 판매가격 : {value.transPrice}원
                              </Col>
                              </Row>
                              <Row style={{ fontSize: "8pt", color: "gray", marginTop: "2vh" }}>
                                <Col offset={0} style={{ fontStyle: "bold" }}>
                                  판매자 : {value.traderName} |
                                  연락처 : {value.traderPhoneNumber}
                                </Col>
                              </Row>
                          </Col>
                          </Row>
                          <Row style={{ fontSize: "12pt", color: "gray", marginTop: "2vh" }}>
                            {boxDetailCard == true && boxActiveIndex == index ?
                              <button onClick={() => { setBoxDetailCard(false) }}>접기</button>
                              : /* 토글 버튼 역할 */
                              <button onClick={() => { setBoxDetailCard(true); 
                                setBoxActiveIndex(index) }}>거래상세보기</button>
                            }
                          </Row>
                        {boxDetailCard == true && boxActiveIndex == index ?
                          <div>
                          <Row style={{ margin: "2vh", color: "#44a0ac" }}>
                            판매자 수락
                          </Row>
                          <Row style={{ fontSize: "5vh", margin: "2vh", color: "#038155" }}>
                            <Icon type="line" rotate="90" />
                          </Row>
                          <Row style={{ marginTop: "2vh", color: "#038196" }}>
                            결제 요청중
                          </Row>

                          {value.transactionStep == 1 ?
                            <div>
                              <Row style={{ marginBottom: "2vh" }}>
                                <button style={{
                                  padding: "0",
                                  width: "30%",
                                  background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                  border: "none", borderRadius: "2.25vh", fontSize: "2vh", height: "3vh"
                                }}
                                  onClick={() => { showModal(); showBoogleBank(); }}
                                >결제 하기</button>
                              </Row>
                              {modal == true ?
                                <Modal
                                  visible={modal}
                                  onOk={() => { payConfirmOnClickHandler(value.sellItemId) }}
                                  onCancel={() => { closeModal(); }}>
                                  {boogleBank == true ?
                                    <p style={{ color: "#000000", fontSize: "3vh" }}>
                                      북을 계좌번호로 입금해주세요</p>
                                    : null} {/*북을 계좌 끝*/}
                                </Modal>
                                : null} {/*모달 끝*/}
                              <Row style={{ fontSize: "5vh", margin: "2vh", color: "gray" }}>
                                <Icon type="line" rotate="90" />
                              </Row>
                            </div>
                            : /*1단계 아니면*/
                              <Row style={{ fontSize: "5vh", margin: "2vh", color: "#065d33" }}>
                                <Icon type="line" rotate="90" />
                              </Row>
                          } {/*1단계 끝*/}

                          {value.transactionStep == 4 || value.transactionStep > 4 ?
                            <Row style={{ margin: "2vh", color: "#065d92" }}>
                              물건 비치 완료
                          </Row>
                            :
                            <Row style={{ margin: "2vh", color: "gray" }}>
                              물건 비치 완료
                          </Row>
                          } {/*4단계 끝*/}

                          {value.transactionStep == 4 ?
                            <Row style={{ marginBottom: "2vh" }}>
                              <Link to = '/boxcheck'>
                              <button style={{
                                padding: "0",
                                width: "30%",
                                background: "#075e92", color: "#ffffff",
                                border: "none", borderRadius: "2.25vh", fontSize: "2vh", height: "3vh"
                              }}>수령 하기</button>
                              </Link>
                            </Row>
                            :
                            null } {/*4단계 끝*/}

                          {value.transactionStep > 4 ?
                            <Row style={{ fontSize: "5vh", margin: "2vh", color: "#0b308e" }}>
                              <Icon type="line" rotate="90" />
                            </Row>
                            :
                            <Row style={{ fontSize: "5vh", margin: "2vh", color: "gray" }}>
                              <Icon type="line" rotate="90" />
                            </Row>
                          } {/*4단계 끝*/}

                          {value.transactionStep == 5 || value.transactionStep > 5 ?
                            <Row style={{ marginBottom: "2vh", color: "#0b308e" }}>
                              거래 완료
                            </Row>
                            :
                            <Row style={{ marginBottom: "2vh", color: "gray" }}>
                              거래 완료
                            </Row>
                        
                          } {/*5단계 끝*/}
                        
                          </div>
                         : null}  {/*거래상세보기 끝*/}
                        </div>
                        
                        }
                      
                      </Card>
                  }
                </div>
              ))
              :  /*구매현황 없을 때*/
              <div>
                <Row style={{ padding: "2vh", margin: "2vh", marginBottom: "50%" }}>
                  <p style={{ color: "#000000", fontSize: "2vh" }}>
                    구매 중인 상품이 없습니다.
                  </p>
                </Row>
                <Row>
                  <Link to="/">
                    <button style={{
                      padding: "0",
                      width: "100%",
                      background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                      border: "none", borderRadius: "2.25vh", fontSize: "2.5vh", height: "5vh"
                    }}
                    >구매하러 가기</button>
                  </Link>
                </Row>
              </div>
            } {/* 구매상품 없을 때 뷰 끝 */}
          </Card>
          : null} {/* buyProduct != true 일 때 null */}

        {sellProduct == true ?
          <Card style={{ width: "100%", backgroundColor: "#ffffff", border: 0, }}>
            {sellList.length != 0 && sellList != null ?
              sellList.map((value, index) => (
                <div style={{ width: "95%", margin: "auto auto" }}>
                  {value.transactionType == 0 ?
                  <div>
                  <div>
                    {value.transactionStep == -1 ?
                    <Card style={{
                      width: "100%", height: "40%", backgroundColor: "#c4c4c4",
                      marginBottom: "2vh", border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                      padding: "2vh",
                    }}>
                      <Row>
                        <Col span={6} offset={6}> </Col>
                        <Col span={6} offset={6} style={{ color: "#339eac", fontSize: "12pt" }}>직거래</Col>
                      </Row>

                      <Row>
                            <Col span={6} offset={0}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img style={{
                                width: "10vh", height: "15vh", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }} src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={1}>
                              <Row style={{ fontStyle: "bold", fontSize: "12pt", textAlign: "left" }}>
                                <Col offset={0}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "8pt", color: "gray", }}>
                                <Col span={12}>
                                  
                                  등록일자 : {/*나중에 수정하기*/}
                                  {value.transactionCreatedTime != null && value.transactionCreatedTime.chartAt(2)}
                                  {value.transactionCreatedTime != null &&value.transactionCreatedTime.chartAt(3)}.
                                  {value.transactionCreatedTime != null &&value.transactionCreatedTime.chartAt(5)}
                                  {value.transactionCreatedTime != null &&value.transactionCreatedTime.chartAt(6)}.
                                  {value.transactionCreatedTime != null &&value.transactionCreatedTime.chartAt(8)}
                                  {value.transactionCreatedTime != null &&value.transactionCreatedTime.chartAt(9)}
                                </Col>
                                <Col span={12}> | 판매가격 : {value.transPrice}원
                              </Col>
                              </Row>
                              <Row style={{ fontSize: "12pt", color: "gray", marginTop: "2vh" }}>
                                <Col offset={3}>
                                  판매 등록 완료
                              </Col>
                              </Row>
                            </Col>
                          </Row>
                    
                    </Card>
                    : /*판매등록된 상품인지 거래 중인지*/

                    <Card style={{
                      width: "100%", height: "40%", backgroundColor: "#e5fdfc",
                      marginBottom: "2vh", border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                      padding: "2vh",
                    }}>
                      <Row>
                        <Col span={6} offset={6}> </Col>
                        <Col span={6} offset={6} style={{ color: "#339eac", fontSize: "12pt" }}>직거래</Col>
                      </Row>

                      {value.transactionStep == 0 ?
                        <div>
                          <Row>
                            <Col span={6} offset={0}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img style={{
                                width: "10vh", height: "15vh", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }} src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={1}>
                              <Row style={{ fontStyle: "bold", fontSize: "12pt", textAlign: "left" }}>
                                <Col offset={0}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "8pt", color: "gray", }}>
                                <Col span={12}>
                                  주문일자 : {/*나중에 수정하기*/}
                                  {value.transactionCreatedTime[2]}
                                  {value.transactionCreatedTime[3]}.
                                  {value.transactionCreatedTime[5]}
                                  {value.transactionCreatedTime[6]}.
                                  {value.transactionCreatedTime[8]}
                                  {value.transactionCreatedTime[9]}
                                </Col>
                                <Col span={12}> | 판매가격 : {value.transPrice}원
                              </Col>
                              </Row>
                              <Row style={{ fontSize: "10pt", color: "gray", marginTop: "2vh" }}>
                                <Col span={4} offset={1}>
                                  <button style={{
                                    padding: "0",
                                    width: "100%",
                                    background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                    border: "none", borderRadius: "2.25vh", fontSize: "2vh", height: "3vh"
                                  }}
                                    onClick={() => {rejectBuyRequest(value.sellItemId)}}
                                  >거절</button>
                                </Col>
                                <Col span={4} offset={1}>
                                  <button style={{
                                    padding: "0",
                                    width: "100%",
                                    background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                    border: "none", borderRadius: "2.25vh", fontSize: "2vh", height: "3vh"
                                  }}
                                    onClick={() => {acceptBuyRequest(value.sellItemId)}}
                                  >수락</button>
                                </Col>
                                <Col span={4} offset={1}>
                                  <button style={{
                                    padding: "0",
                                    width: "100%",
                                    background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                    border: "none", borderRadius: "2.25vh", fontSize: "2vh", height: "3vh"
                                  }}
                                    onClick={() => { }}
                                  >조회</button>
                                </Col>
                              </Row>

                            </Col>
                          </Row>
                        </div>
                        : 
                        <div>
                        <Row>
                            <Col span={6} offset={0}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img style={{
                                width: "10vh", height: "15vh", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }} src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={1}>
                              <Row style={{ fontStyle: "bold", fontSize: "12pt", textAlign: "left" }}>
                                <Col offset={0}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "8pt", color: "gray", }}>
                              <Col span={12}>
                                주문일자 : {/*나중에 수정하기*/}
                                {value.transactionCreatedTime[2]}
                                {value.transactionCreatedTime[3]}.
                                {value.transactionCreatedTime[5]}
                                {value.transactionCreatedTime[6]}.
                                {value.transactionCreatedTime[8]}
                                {value.transactionCreatedTime[9]}
                              </Col>
                              <Col span={12}> | 판매가격 : {value.transPrice}원
                            </Col>
                            </Row>
                            <Row style={{ fontSize: "8pt", color: "gray", marginTop: "2vh" }}>
                                <Col offset={0} style={{ fontStyle: "bold" }}>
                                  구매자 : {value.traderName} |
                                  연락처 : {value.traderPhoneNumber}
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row style={{ fontSize: "12pt", color: "gray", marginTop: "2vh" }}>
                            {dirDetailCard == true && dirActiveIndex == index ?
                              <button onClick={() => { setDirDetailCard(false) }}>접기</button>
                              :
                              <button onClick={() => { setDirDetailCard(true); 
                                setDirActiveIndex(index) }}>거래상세보기</button>
                            }
                          </Row>
                        {dirDetailCard == true && dirActiveIndex == index ?
                          <div>
                            <Row style={{ margin: "2vh", color: "#44a0ac" }}>
                              판매자 수락
                            </Row>
                            <Row style={{ fontSize: "5vh", margin: "2vh", color: "#038155" }}>
                              <Icon type="line" rotate="90" />
                            </Row>
                            {value.transactionStep == 2 || value.transactionStep > 2 ?
                            <Row style={{ marginTop: "2vh", color: "#038196" }}>
                              거래중
                            </Row>
                            :
                            <Row style={{ marginTop: "2vh", color: "gray" }}>
                              거래중
                            </Row>
                            }
                            {value.transactionStep == 3 ?
                            <div>
                              <Row style={{ fontSize: "5vh", margin: "2vh", color: "#0396cf" }}>
                                <Icon type="line" rotate="90" />
                              </Row>
                              <Row style={{ marginTop: "2vh", color: "#0396cf" }}>
                                거래 완료
                              </Row>
                            </div>
                            :
                            <div>
                            <Row style={{ fontSize: "5vh", margin: "2vh", color: "gray" }}>
                              <Icon type="line" rotate="90" />
                            </Row>
                            <Row style={{ marginTop: "2vh", color: "gray" }}>
                              거래 완료
                            </Row>
                            </div>
                            } {/*직거래 3단계*/}
                            
                          </div>
                          : null } {/*직거래 step들*/}
                      </div>
                    }
                    </Card>
                    } {/*판매등록된 상품 끝*/}
                    </div>
                  </div>
                    :  /*직거래인지 북을박스인지 구분*/
                    <div>
                    <div>
                    {value.transactionStep == -1 ?
                    <Card style={{
                      width: "100%", height: "40%", backgroundColor: "#c4c4c4",
                      marginBottom: "2vh", border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                      padding: "2vh",
                    }}>
                      <Row>
                        <Col span={6} offset={6}> </Col>
                        <Col span={7} offset={5} style={{ color: "#0b308e", fontSize: "12pt" }}>북을박스</Col>
                        </Row>

                        <Row>
                            <Col span={6} offset={0}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img style={{
                                width: "10vh", height: "15vh", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }} src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={1}>
                              <Row style={{ fontStyle: "bold", fontSize: "12pt", textAlign: "left" }}>
                                <Col offset={0}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "8pt", color: "gray", }}>
                                <Col span={12}>
                                  등록일자 : {/*나중에 수정하기*/}
                                  {value.transactionCreatedTime[2]}
                                  {value.transactionCreatedTime[3]}.
                                  {value.transactionCreatedTime[5]}
                                  {value.transactionCreatedTime[6]}.
                                  {value.transactionCreatedTime[8]}
                                  {value.transactionCreatedTime[9]}
                                </Col>
                                <Col span={12}> | 판매가격 : {value.transPrice}원
                              </Col>
                              </Row>
                              <Row style={{ fontSize: "12pt", color: "gray", marginTop: "2vh" }}>
                                <Col offset={3}>
                                  판매 등록 완료
                              </Col>
                              </Row>
                            </Col>
                          </Row>
                    
                    </Card>
                    : /*판매등록된 상품인지 거래 중인지*/
                    <Card style={{
                      width: "100%", height: "40%", backgroundColor: "#e8f5ff",
                      marginBottom: "2vh", border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                      padding: "2vh",
                    }}>
                      <Row>
                        <Col span={7} offset={5}> </Col>
                        <Col span={7} offset={5} style={{ color: "#0b308e", fontSize: "12pt" }}>북을박스</Col>
                      </Row>
                      {value.transactionStep == 0 ?
                        <div>
                          <Row>
                            <Col span={6} offset={0}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img style={{
                                width: "10vh", height: "15vh", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }} src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={1}>
                              <Row style={{ fontStyle: "bold", fontSize: "12pt", textAlign: "left" }}>
                                <Col offset={0}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "8pt", color: "gray", }}>
                                <Col span={12}>
                                  주문일자 : {/*나중에 수정하기*/}
                                  {value.transactionCreatedTime[2]}
                                  {value.transactionCreatedTime[3]}.
                                  {value.transactionCreatedTime[5]}
                                  {value.transactionCreatedTime[6]}.
                                  {value.transactionCreatedTime[8]}
                                  {value.transactionCreatedTime[9]}
                                </Col>
                                <Col span={12}> | 판매가격 : {value.transPrice}원
                              </Col>
                              </Row>
                              <Row style={{ fontSize: "10pt", color: "gray", marginTop: "2vh" }}>
                                <Col span={4} offset={1}>
                                  <button style={{
                                    padding: "0",
                                    width: "100%",
                                    background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                    border: "none", borderRadius: "2.25vh", fontSize: "2vh", height: "3vh"
                                  }}
                                    onClick={() => rejectBuyRequest(value.sellItemId)}
                                  >거절</button>
                                </Col>
                                <Col span={4} offset={1}>
                                  <button style={{
                                    padding: "0",
                                    width: "100%",
                                    background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                    border: "none", borderRadius: "2.25vh", fontSize: "2vh", height: "3vh"
                                  }}
                                    onClick={() => acceptBuyRequest(value.sellItemId)}
                                  >수락</button>
                                </Col>
                                <Col span={4} offset={1}>
                                  <button style={{
                                    padding: "0",
                                    width: "100%",
                                    background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                    border: "none", borderRadius: "2.25vh", fontSize: "2vh", height: "3vh"
                                  }}
                                    onClick={() => { }}
                                  >조회</button>
                                </Col>
                              </Row>

                            </Col>
                          </Row>
                        </div>

                        : /*판매상품의 step이 0일 때와 아닐 때(판매자 수락 전, 후)*/

                        <div style={{ fontSize: "12pt", fontStyle: "bold" }}>
                          <Row>
                            <Col span={6} offset={0}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img style={{
                                width: "10vh", height: "15vh", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }} src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={1}>
                              <Row style={{ fontStyle: "bold", fontSize: "12pt", textAlign: "left" }}>
                                <Col offset={0}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "8pt", color: "gray", }}>
                                <Col span={12}>
                                  주문일자 : {/*나중에 수정하기*/}
                                  {value.transactionCreatedTime[2]}
                                  {value.transactionCreatedTime[3]}.
                                  {value.transactionCreatedTime[5]}
                                  {value.transactionCreatedTime[6]}.
                                  {value.transactionCreatedTime[8]}
                                  {value.transactionCreatedTime[9]}
                                </Col>
                                <Col span={12}> | 판매가격 : {value.transPrice}원
                              </Col>
                              </Row>
                              <Row style={{ fontSize: "8pt", color: "gray", marginTop: "2vh" }}>
                                <Col offset={0} style={{ fontStyle: "bold" }}>
                                  구매자 : {value.traderName} |
                                  연락처 : {value.traderPhoneNumber}
                                </Col>
                              </Row>
                          </Col>
                          </Row>
                          <Row style={{ fontSize: "12pt", color: "gray", marginTop: "2vh" }}>
                            {boxDetailCard == true && boxActiveIndex == index ?
                              <button onClick={() => { setBoxDetailCard(false) }}>접기</button>
                              : /* 토글 버튼 역할 */
                              <button onClick={() => { setBoxDetailCard(true); 
                                setBoxActiveIndex(index) }}>거래상세보기</button>
                            }
                          </Row>
                        {boxDetailCard == true && boxActiveIndex == index ?
                          <div>
                          <Row style={{ margin: "2vh", color: "#44a0ac" }}>
                            판매자 수락
                          </Row>
                          <Row style={{ fontSize: "5vh", margin: "2vh", color: "#038155" }}>
                            <Icon type="line" rotate="90" />
                          </Row>
                          <Row style={{ marginTop: "2vh", color: "#038196" }}>
                            결제 요청중
                          </Row>

                          {value.transactionStep == 1 ?
                            <div>
                              <Row style={{ marginBottom: "2vh" }}>
                                <button style={{
                                  padding: "0",
                                  width: "30%",
                                  background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                  border: "none", borderRadius: "2.25vh", fontSize: "2vh", height: "3vh"
                                }}
                                  onClick={() => { showModal(); showSellerBank(); }}
                                >결제 정보</button>
                              </Row>
                              {modal == true ?
                                <Modal
                                  visible={modal}
                                  onOk={() => { payConfirmOnClickHandler(value.sellItemId) }}
                                  onCancel={() => { closeModal(); }}>
                                  {sellerBank == true ?
                                    <p style={{ color: "#000000", fontSize: "3vh" }}>
                                      판매자의 계좌 정보</p>
                                    : null} {/*판매자 계좌 끝*/}
                                </Modal>
                                : null} {/*모달 끝*/}
                              <Row style={{ fontSize: "5vh", margin: "2vh", color: "gray" }}>
                                <Icon type="line" rotate="90" />
                              </Row>
                            </div>
                            : /*1단계 아니면*/
                              <Row style={{ fontSize: "5vh", margin: "2vh", color: "#065d33" }}>
                                <Icon type="line" rotate="90" />
                              </Row>
                          } {/*1단계 끝*/}

                          {value.transactionStep == 4 || value.transactionStep > 4 ?
                            <Row style={{ margin: "2vh", color: "#065d92" }}>
                              물건 비치 중
                            </Row>
                            : /*4단계 이상인지 아닌지*/
                            <Row style={{ margin: "2vh", color: "gray" }}>
                              물건 비치 중
                            </Row>
                          } {/*4단계 이상인지 끝*/}

                          {value.transactionStep == 4 ?
                            <Row style={{ marginBottom: "2vh" }}>
                            <Link to = '/boxinput'>
                              <button style={{
                                padding: "0",
                                width: "30%",
                                background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                border: "none", borderRadius: "2.25vh", fontSize: "2vh", height: "3vh"
                              }}>비치 하기</button>
                            </Link>
                            </Row>
                            :
                            null } {/*4단계 버튼 끝*/}

                          {value.transactionStep > 4 ?
                            <Row style={{ fontSize: "5vh", margin: "2vh", color: "#0b308e" }}>
                              <Icon type="line" rotate="90" />
                            </Row>
                            :
                            <Row style={{ fontSize: "5vh", margin: "2vh", color: "gray" }}>
                              <Icon type="line" rotate="90" />
                            </Row>
                          } {/*4단계 끝*/}

                          {value.transactionStep == 5 || value.transactionStep > 5 ?
                          <div>
                            <Row style={{ marginBottom: "2vh", color: "#0b308e" }}>
                              거래 완료
                            </Row>
                            <Row style={{ marginBottom: "2vh" }}>
                            <button style={{
                              padding: "0",
                              width: "30%",
                              background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                              border: "none", borderRadius: "2.25vh", fontSize: "2vh", height: "3vh"
                            }}>송금 문의</button>
                            {/*링크 걸어야함*/}
                            </Row>
                          </div>
                            : /*5단계 이상인지 아닌지*/
                            <Row style={{ marginBottom: "2vh", color: "gray" }}>
                              거래 완료
                            </Row>
                        
                          } {/*5단계 끝*/}
                        
                          </div>
                         : null}  {/*거래상세보기 끝*/}
                        </div>
                        
                        }
                      
                      </Card>
                      } {/*판매등록된 상품이 아닐 때 끝*/}
                      </div>

                    </div>}
                
                </div>
              ))
              :  /*판매현황 없을 때*/
              <div>
                <Row style={{ padding: "2vh", margin: "2vh", marginBottom: "50%" }}>
                  <p style={{ color: "#000000", fontSize: "2vh" }}>
                    판매 중인 상품이 없습니다.
                  </p>
                </Row>
                <Row>
                  <Link to="/sell">
                    <button style={{
                      padding: "0",
                      width: "100%",
                      background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                      border: "none", borderRadius: "2.25vh", fontSize: "2.5vh", height: "5vh"
                    }}
                    >판매하러 가기</button>
                  </Link>
                </Row>
              </div>
            } {/* 판매상품 없을 때 뷰 끝 */}
          </Card>
          : null} {/* sellProduct != true 일 때 null */}

      </Row>
    </div>
  )
}