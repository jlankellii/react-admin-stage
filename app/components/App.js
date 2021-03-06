import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import '../static/css/index.less';

import SiderCustom from './SiderCustom';
import HeaderCustom from './HeaderCustom';
import UForm from '../containers/index/Form';
import Money from '../containers/money/money';
import Password from '../containers/password/password';
import noMatch from './404';

const {Content, Footer} = Layout;

export default class App extends Component {
    state = {
        collapsed: localStorage.getItem("zoie_SiderCollapsed") === "true",
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        }, function () {
            localStorage.setItem("zoie_SiderCollapsed", this.state.collapsed);
        });
    };

    componentDidMount() {
        //保存Sider收缩
        if (localStorage.getItem("zoie_SiderCollapsed") === null) {
            localStorage.setItem("zoie_SiderCollapsed", false);
        }
    }

    render() {
        const {collapsed} = this.state;
        const {location} = this.props;
        let name;
        if (localStorage.getItem("zoie_user") === null) {
            return <Redirect to="/login"/>
        } else {
            name = location.state === undefined ? JSON.parse(localStorage.getItem("zoie_user")).username : location.state.username;
        }

        return (
            <Layout className="ant-layout-has-sider" style={{height: '100%'}}>
                <SiderCustom collapsed={collapsed} path={location.pathname}/>
                <Layout>
                    <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={name}/>
                    <Content style={{margin: '0 16px'}}>
                        <Switch>
                            <Route exact path={'/app/money'} component={Money} />
                            <Route exact path={'/app'} component={UForm} />
                            <Route exact path={'/app/password'} component={Password}/>
                            <Route component={noMatch} />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        react-admin ©2017-2018 Created by zoie
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
