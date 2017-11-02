import React from 'react';
import {
  Framework7App, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle,
  List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
  LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput,
} from 'framework7-react';
import doge from './assets/img/doge.jpeg';
import s from './components/css/app1.less';
import { routes } from './routes';


const MainViews = () => {
  return (
    <Views>
      <View id="main-view" navbarThrough dynamicNavbar main url="/">
        <Navbar>
          <NavLeft>
            <Link icon="icon-bars" openPanel="left" />
          </NavLeft>
          <NavCenter sliding>Framework7</NavCenter>
          <NavRight>
            <Link icon="icon-bars" openPanel="right" />
          </NavRight>
        </Navbar>
        <Pages>
          <Page>
            <div className={s.test}>test</div>
            <div className="test1">213</div>
            <img src={doge} alt="I'm Doge" />
            <ContentBlockTitle>Welcome to my App</ContentBlockTitle>
            <ContentBlock inner>
              <p>Duis sed erat ac eros ultrices pharetra id ut tellus
                . Praesent rhoncus enim ornare ipsum aliquet
                ultricies. Pellentesque sodales erat quis elementum sagittis.
              </p>
              <p>Duis sed erat ac eros ultrices pharetra id ut tellus
                . Praesent rhoncus enim ornare ipsum aliquet
                ultricies. Pellentesque sodales erat quis elementum sagittis.
              </p>
              <p>Duis sed erat ac eros ultrices pharetra id ut tellus
                . Praesent rhoncus enim ornare ipsum aliquet
                ultricies. Pellentesque sodales erat quis elementum sagittis.
              </p>
              <p>Duis sed erat ac eros ultrices pharetra id ut tellus
                . Praesent rhoncus enim ornare ipsum aliquet
                ultricies. Pellentesque sodales erat quis elementum sagittis.
              </p>
              <p>Duis sed erat ac eros ultrices pharetra id ut tellus
                . Praesent rhoncus enim ornare ipsum aliquet
                ultricies. Pellentesque sodales erat quis elementum sagittis.
              </p>
            </ContentBlock>
            <ContentBlockTitle>Navigation</ContentBlockTitle>
            <List>
              <ListItem link="/about/" title="About" />
              <ListItem link="/form/" title="Form" />
            </List>
            <ContentBlockTitle>Side Panels</ContentBlockTitle>
            <ContentBlock>
              <GridRow>
                <GridCol width={50}>
                  <Button openPanel="left">Left Panel</Button>
                </GridCol>
                <GridCol width={50}>
                  <Button openPanel="right">Right Panel</Button>
                </GridCol>
              </GridRow>
            </ContentBlock>
            <ContentBlockTitle>Modals</ContentBlockTitle>
            <ContentBlock>
              <GridRow>
                <GridCol width={50}>
                  <Button openPopup="#popup">Popup</Button>
                </GridCol>
                <GridCol width={50}>
                  <Button openLoginScreen="#login-screen">Login Screen</Button>
                </GridCol>
              </GridRow>
            </ContentBlock>
          </Page>
        </Pages>
      </View>
    </Views>
  );
};

const AppPopup = () => (
  <Popup id="popup">
    <View navbarFixed>
      <Pages>
        <Page>
          <Navbar title="Popup">
            <NavRight>
              <Link closePopup>Close</Link>
            </NavRight>
          </Navbar>
          <ContentBlock>Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Neque, architecto. Cupiditate
            laudantium rem nesciunt numquam, ipsam.
            Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto
            nemo quos ullam obcaecati, quod.
          </ContentBlock>
        </Page>
      </Pages>
    </View>
  </Popup>
);

const AppLoginScreen = () => (
  <LoginScreen id="login-screen">
    <View>
      <Pages>
        <Page loginScreen>
          <LoginScreenTitle>Login</LoginScreenTitle>
          <List form>
            <ListItem>
              <FormLabel>Username</FormLabel>
              <FormInput name="username" placeholder="Username" type="text" />
            </ListItem>
            <ListItem>
              <FormLabel>Password</FormLabel>
              <FormInput name="password" type="password" placeholder="Password" />
            </ListItem>
          </List>
          <List>
            <ListButton title="Sign In" closeLoginScreen />
            <ListLabel>
              <p>Click Sign In to close Login Screen</p>
            </ListLabel>
          </List>
        </Page>
      </Pages>
    </View>
  </LoginScreen>
);

export const App = () => (
  // Change themeType to "material" to use the Material theme
  <Framework7App themeType="ios" routes={routes}>
    <MainViews />
    <AppPopup />
    <AppLoginScreen />
  </Framework7App>
);
