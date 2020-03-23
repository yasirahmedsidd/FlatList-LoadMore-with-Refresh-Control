import React, {Component} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';

export default class Todos extends React.PureComponent {
  render() {
    const flistref = this.props.flistref;
    return (
      <View>
        <Text> {this.props.item.id}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

// import React from 'react';
// import {StyleSheet, Text, View, Button} from 'react-native';

// const Todos = ({item, fListRef}) => {
//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//         flexWrap: 'wrap',
//         justifyContent: 'space-evenly',
//       }}>
//       <Text style={{fontSize: 150 / 2}}>
//         {JSON.stringify(item.id)}
//         {/* {JSON.stringify(item.id)} : {JSON.stringify(item.title)} */}
//       </Text>
//       <Button title="End" onPress={() => fListRef.current.scrollToEnd()} />
//       <Button
//         title="Top"
//         onPress={() =>
//           fListRef.current.scrollToOffset({animated: true, offset: 0})
//         }
//       />
//     </View>
//   );
// };

// export default Todos;

// const styles = StyleSheet.create({});
