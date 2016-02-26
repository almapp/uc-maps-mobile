import React, { ScrollView, Component, StyleSheet, Text, View, Linking, Platform } from 'react-native'
import {TableView, Section, Cell} from 'react-native-tableview-simple'


export default class InformationView extends Component {
  static get defaultProps() {
    const meta = require('../../../package.json')
    return {
      version: meta.version,
      license: meta.license,
      url: meta.homepage,
      author: meta.author,
      policy: meta.policy,
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.stage} style={[styles.container, this.props.style]}>
        <TableView>
          <Section header="Legal" footer="Resumen: tu localización nunca es compartida y no se garantiza que todos los datos aquí sean los correctos.">
            <Cell cellstyle="Subtitle" title="Aplicación no oficial de la PUC" detail="Por y para la comunidad" />
            <Cell cellstyle="Basic" title="Política de privacidad" accessory="DisclosureIndicator" onPress={this.goToURL.bind(this, this.props.policy)} />
          </Section>
          <Section header="Aplicación">
            <Cell cellstyle="RightDetail" title="Versión" detail={this.props.version} />
            <Cell cellstyle="RightDetail" title="Licencia" detail={this.props.license} />
            <Cell cellstyle="RightDetail" title="Repositorio" detail="Github" accessory="DisclosureIndicator" onPress={this.goToURL.bind(this, this.props.url)} />
          </Section>
          <Section header="Autor">
            <Cell cellstyle="Subtitle" title={this.props.author.name} detail={this.props.author.information} />
            <Cell cellstyle="RightDetail" title="Email" detail={this.props.author.email} accessory="DisclosureIndicator" onPress={this.goToURL.bind(this, `mailto:${this.props.author.email}`)} />
            <Cell cellstyle="RightDetail" title="URL" detail={this.props.author.url} accessory="DisclosureIndicator" onPress={this.goToURL.bind(this, this.props.author.url)} />
          </Section>
        </TableView>
      </ScrollView>
    );
  }

  goToURL(url) {
    Linking.openURL(url)
      .catch(err => console.error('An error occurred', err))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4',
  },
  stage: {
    paddingTop: 20,
    paddingBottom: 20,
  },
})
