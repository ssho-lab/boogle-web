import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import DetailSubject from "./pages/DetailSubject.js";
import CustomerInquiry from "./pages/CustomerInquiry";
import CustomerCenterPage from "./pages/CustomerCenterPage";
import ModifyInfo from "./pages/ModifyInfo";
import Setting from "./pages/Setting";
import AccountSetting from "./pages/AccountSetting";
import Admin from "./pages/Admin";
import SignInSetting from "./pages/SignInSetting";
import ModifyPasswordForm from "././components/ModifyInfo/ModifyPasswordForm";
import ModifyItem from "./pages/ModifyItemPage";
import MyPageLikePage from './pages/MyPageLike';
import MyPageBuyPage from './pages/MyPageBuy';
import MyPageSellPage from './pages/MyPageSell';
import MyPageReservePage from './pages/MyPageReserve';

import './DesktopError.css';

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import ModifyItemPage from "./pages/ModifyItemPage";
import BuySearchResultPage from "./pages/BuySearchResultPage";

class App extends Component {
  render() {
    const warning = () => {
      return(
      <div id="error-page">
        <main className="upper">
          <img src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/not_found.png"/>
            <h1>잘못된 경로로 접속하셨습니다.</h1>

        </main>
        <div className="down">
          <p>
            잘못된 경로로 접속하셨습니다.
            모바일 환경에서 다시 시도해주세요.
          </p>
        </div>
        <footer>
          <img src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/error_boogle.png"/>
            <p>캠퍼스 거래의 모든것, 북을</p>
        </footer>
      </div>);
    };
    
    // 웹 화면 뷰를 위해 시도해보았으나 정말 별로입니다.
    // var appWidth;
    // if (isMobile) appWidth = "100%";
    // else if (isBrowser) appWidth = "600px";

    if (isMobile) {
      return (
        <Router>
          <Switch>
            {/*<div id="app" style={{width: appWidth, margin: "auto"}}>*/}
            <Route exact path="/" component={Home} />

             <Route path="/sell" component={Sell} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/buy/detail/:id" component={DetailSubject} />
            <Route path="/customerinquiry" component={CustomerInquiry} />
            <Route path="/customercenter" component={CustomerCenterPage} />
            <Route path="/modifyInfo" component={ModifyInfo} />
            <Route path="/setting" component={Setting} />
            <Route path="/accountSetting" component={AccountSetting} />
            <Route path="/admin" component={Admin} />
            <Route path="/signinSetting" component={SignInSetting} />
            <Route path="/modifyPassword" component={ModifyPasswordForm} />
            <Route path="/modifyitem/:id" component={ModifyItem} />

            <Route path="/mypage/like" component={MyPageLikePage} />
            <Route path="/mypage/buy" component={MyPageBuyPage} />
            <Route path="/mypage/sell" component={MyPageSellPage} />
            <Route path="/mypage/reserve" component={MyPageReservePage} />
            <Route path="/buy/all" component={BuySearchResultPage}/>
            {/*</div>*/}
          </Switch>
        </Router>
      );
    } else {
      return (
        <Router>
          <Switch>
            <Route exact path="/" component={warning}></Route>
            <Route path="/admin" component={Admin}></Route>
          </Switch>
        </Router>
      );
    }
  }
}
export default App;
