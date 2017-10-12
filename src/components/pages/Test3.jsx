import React from 'react';
import {
  Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle,
  List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
  LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput
} from 'framework7-react';


export const Test1 = () => {
  return (
    <View>
      <Navbar title="Test1" backLink="Back" sliding backLinkUrl="/" />
      <Pages>
        <Page>
          333
        </Page>
      </Pages>
    </View>
  );
};
