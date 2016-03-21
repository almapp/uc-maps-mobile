import React, { View, Text, Image, ScrollView, Component, StyleSheet, Linking, Platform } from 'react-native'
import { TableView, Section, Cell, CustomCell } from 'react-native-tableview-simple'
import { Actions } from 'react-native-router-flux'
import ViewPager from 'react-native-viewpager'
import renderIf from '../../util/render-if'
import Icon from 'react-native-vector-icons/Ionicons'

import realm, { Place } from '../../realm'
import Toolbar from '../toolbar'
import Colors from '../../global/colors'


export default class DetailView extends Component {
  static get defaultProps() {
    return {
      place: realm.objects('Place').filtered('identifier = "ING"').snapshot()[0],
    }
  }

  get datasource() {
    return new ViewPager.DataSource({ pageHasChanged: (url1, url2) => url1 !== url2 })
  }

  render() {
    const place = this.props.place
    const contact = place.contact

    // TODO
    const address = 'Alameda Libertador Bernardo O´Higgins 340, 8331150 Santiago de Chile'
    const phones = [
      { name: 'Rectoría', number: '(56 2) 354 4511' },
      { name: 'Centro de alumnos', number: '(56) (2) 2354 2000' },
      { name: 'Secretaría', number: '+56 9 90511003' },
    ]
    const urls = [
      { name: 'Escuela', url: 'http://www.quimica.uc.cl' },
    ]
    const emails = [
      { name: 'Coordinador', address: 'lorem@uc.cl' },
    ]
    const socials = [
      { type: 'Facebook', id: 'faifuc', url: 'https://www.facebook.com/faifuc' },
    ]
    const information = 'Lorem ipsum ad his scripta blandit partiendo, eum fastidii accumsan euripidis in, eum liber hendrerit an. Qui ut wisi vocibus suscipiantur, quo dicit ridens inciderint id. Quo mundi lobortis reformidans eu, legimus senserit definiebas an eos. Eu sit tincidunt incorrupte definitionem, vis mutat affert percipit cu, eirmod consectetuer signiferumque eu per. In usu latine equidem dolores. Quo no falli viris intellegam, ut fugit veritus placerat per.'

    return (
      <View style={[styles.container, this.props.style]}>
        {renderIf(Platform.OS !== 'ios')(
          <Toolbar backButton title="Detalle" actions={[]} />
        )}
        <ScrollView contentContainerStyle={styles.stage} style={styles.scrollview}>
          <ViewPager
            ref="pager"
            style={styles.header}
            dataSource={this.datasource.cloneWithPages(['https://almapp.github.io/uc-maps-assets/images/campuses/SJ.jpg'])}
            isLoop={false}
            autoPlay={true}
            renderPage={url => <Image style={styles.image} source={{uri: url}} />}
            />

          <TableView>
            <Section>
              {renderIf(information)(
                <CustomCell cellHeight={null}>
                  <Text style={styles.information} numberOfLines={10}>
                    {information}
                  </Text>
                </CustomCell>
              )}
              {renderIf(address)(
                <Cell cellstyle="Subtitle" detail={address} title="Dirección"
                      accessory="DisclosureIndicator" onPress={this.showInMap.bind(this, address)} />
              )}
            </Section>

            <Section header="Sitios web">
              {renderIf(urls && urls.length)(
                urls.map((url, i) => (
                  <Cell key={i} cellstyle="LeftDetail" detail={url.name} title={url.url}
                        accessory="DisclosureIndicator" onPress={this.visitWebPage.bind(this, url)} />
                ))
              )}
            </Section>

            <Section header="Redes sociales">
              {renderIf(socials && socials.length)(
                socials.map((social, i) => (
                  <Cell key={i} cellstyle="LeftDetail" detail={social.type} title={social.id}
                        accessory="DisclosureIndicator" onPress={this.visitSocialNetwork.bind(this, social)} />
                ))
              )}
            </Section>

            <Section header="Correos electrónicos">
              {renderIf(emails && emails.length)(
                emails.map((email, i) => (
                  <Cell key={i} cellstyle="LeftDetail" detail={email.name} title={email.address}
                        accessory="DisclosureIndicator" onPress={this.sendEmail.bind(this, email)}/>
                ))
              )}
            </Section>

            <Section header="Teléfonos">
              {renderIf(phones && phones.length)(
                phones.map((phone, i) => (
                  <Cell key={i} cellstyle="LeftDetail" detail={phone.name} title={phone.number}
                        accessory="DisclosureIndicator" onPress={this.callPhone.bind(this, phone)} />
                ))
              )}
            </Section>

          </TableView>
        </ScrollView>

      </View>
    )
  }

  intent(uri) {
    return Linking.canOpenURL(uri)
      .then(supported => supported ? Linking.openURL(uri) : null)
      .catch(err => console.error('An error occurred', err))
  }

  showInMap(address) {
    console.log('Go to', address)
  }

  callPhone(phone) {
    const uri = Platform.OS === 'ios' ? `telprompt:${phone.number}` : `tel:${phone.number}`
    return this.intent(uri)
  }

  visitWebPage(url) {
    return this.intent(url.url)
  }

  sendEmail(email) {
    return this.intent(`mailto:${email.address}`)
  }

  visitSocialNetwork(social) {
    return this.intent(social.url)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 64 : 0,
    backgroundColor: '#EFEFF4',
  },
  header: {
    height: 150,
  },
  image: {
    height: 150,
    flex: 1,
  },
  scrollview: {
    flex: 1,
  },
  stage: {
    paddingBottom: 20,
  },
  information: {
    flex: 1,
    fontSize: 12,
    textAlign: 'left',
  },
})
