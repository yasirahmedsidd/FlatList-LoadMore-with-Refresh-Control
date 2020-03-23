import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Button,
  TouchableOpacity,
  RefreshControl,
  Animated,
  Easing,
} from 'react-native';
import Todos from './Todos';
const App = () => {
  // Refresh Control
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getInitialData().then(() => setRefreshing(false));
  }, [refreshing]);

  // Flatlist
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState('');
  const [showBtn, setShowBtn] = useState(false);

  const getInitialData = async () => {
    setIsLoading(true);
    const asd = await fetch(
      `http://jsonplaceholder.typicode.com/todos?_limit=50&_page=1`,
    );
    const asdf = await asd.json();
    setData(asdf);
    setIsLoading(false);
    setPage(2);
  };

  const getMoreData = async page => {
    try {
      setIsLoading(true);
      const asd = await fetch(
        `http://jsonplaceholder.typicode.com/todos?_limit=50&_page=${page}`,
      );
      const asdf = await asd.json();
      if (asdf.length === 0) {
        setMsg('All caught up!');
        setIsLoading(false);
      } else {
        const asdfg = await data.concat(asdf);
        setPage(page + 1);
        setData(asdfg);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInitialData();
  }, []);
  const fListRef = React.createRef();

  const btn = (
    <Animated.View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
        zIndex: 100,
      }}>
      <TouchableOpacity
        onPress={() =>
          fListRef.current.scrollToOffset({animated: true, offset: 0})
        }
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: 'crimson',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#FFF'}}>Top</Text>
      </TouchableOpacity>
    </Animated.View>
  );
  return (
    <View style={styles.container}>
      {console.log('Page', page)}
      {showBtn && btn}

      <FlatList
        onScroll={e =>
          e.nativeEvent.contentOffset.y > 100
            ? setShowBtn(true)
            : setShowBtn(false)
        }
        refreshControl={
          <RefreshControl
            // size={RefreshControl.SIZE.LARGE}
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['red', 'green', 'blue']}
            progressBackgroundColor="#FFF"
            progressViewOffset={100}
          />
        }
        ref={fListRef}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return <Todos item={item} fListRef={fListRef.current} />;
        }}
        ListEmptyComponent={() => (
          <View style={{}}>
            <ActivityIndicator size="large" color="red" />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{margin: 10}}></View>}
        onEndReached={e => {
          if (!isLoading) {
            // setPage(page + 1);
            getMoreData(page);
          }
        }}
        ListFooterComponent={() =>
          isLoading && data.length > 0 ? (
            <View
              style={{
                height: 100,
                backgroundColor: '#eee',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'grey'}}>Loading More {'  '}</Text>
              <ActivityIndicator size="large" color="grey" />
            </View>
          ) : (
            <View
              style={{
                height: 100,
                backgroundColor: '#eee',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'grey'}}>{msg}</Text>
            </View>
          )
        }
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    zIndex: -1,
  },
});
