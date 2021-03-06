import React from 'react';
import { Text, Alert } from 'react-native';
import { Container, Left, Body, Right, View, Icon, Fab, List, ListItem } from 'native-base';
import PouchDB from 'pouchdb-react-native'
import colors from '../utils/colors';

const styles = {
  dontHaveAny: {
    lineHeight: 22,
    fontSize: 18,
    textAlign: 'center',
    color: colors.neutral
  }
}

class Plants extends React.Component {
  state = {
    plants: []
  };

  componentDidMount() {
    this.initialize();
  }

  initialize = async () => {
    const db = new PouchDB('environments');
    const environmentId = this.props.navigation.getParam('environmentId');
    const environment = await db.get(environmentId);

    console.log(environment);

    // if(environments.total_rows > 0) {
    //   this.setState({
    //     environments: environments.rows
    //   });
    // } else {
    //   db.post({
    //     title: 'Starter'
    //   });
    // }
  }

  onPressEnvironment = () => {
    this.props.navigation.navigate('Plants');
  }

  render() {
    return (
    <Container>
      <Fab
        active={true}
        direction="down"
        style={{ backgroundColor: colors.green }}
        position="bottomRight"
        onPress={() => this.setState({ active: !this.state.active })}>
        <Icon name="add" />
      </Fab>
      {this.state.plants.length === 0 &&
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20}}>
        <Icon name="alert" style={{ fontSize: 50, marginBottom: 10, color: colors.neutral }} />
        <Text style={styles.dontHaveAny}>It looks like you don't have any environment.</Text>
        <Text style={styles.dontHaveAny}>Create one now!</Text>
      </View>}
      {this.state.plants.length > 0 && (
      <List>
        {/* {this.state.plants.map(env => (
        <ListItem onPress={this.onPressEnvironment} key={env.doc.title}>
          <Body>
            <Text style={{fontWeight: 'bold', fontSize: 16 }}>{env.doc.title}</Text>
            <Text style={{fontSize: 10 }}>Last updated: 23:42 03/05/2018</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        ))} */}
      </List>)}
    </Container>
    )
  }
};

Plants.navigationOptions = {
  title: 'Plants'
}
export default Plants;
