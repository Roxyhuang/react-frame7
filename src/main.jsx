
import React from 'react';
import ReactDOM from 'react-dom';
// import {App} from './components/App';
import {
  Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle,
  List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
  LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput
} from 'framework7-react';

ReactDOM.render(
  <Framework7App themeType="ios">
        <Navbar title="My App" />
        <Pages>
          <Page>
            <ContentBlock>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
            </ContentBlock>
          </Page>
        </Pages>
  </Framework7App>,
  document.getElementById('root')
);
