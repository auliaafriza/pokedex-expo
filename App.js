import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function App() {
  const [listData, setListData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [dataDetail, setDataDetail] = useState([]);
  let tempItem = [];

  const getDataDetail = (url) => {
    axios({
      method: 'get',
      url: url,
    }).then(function (response) {
      tempItem.push(response?.data);
      setDataDetail(tempItem);
    });
  };

  console.log('tempItem', tempItem);
  console.log('dataDetail', dataDetail);

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`,
    }).then(function (response) {
      setListData(response.data.results);
      if (response.data.results && response.data.results.length !== 0) {
        response.data.results.map((itemRes) => getDataDetail(itemRes.url));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {listData && listData.length !== 0
        ? listData.map((item, i) => {
            return (
              <Card sx={{ maxWidth: 345, marginBottom: 5 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={
                    dataDetail && dataDetail.length !== 0
                      ? dataDetail[i]?.sprites?.front_default
                      : ''
                  }
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  {dataDetail &&
                  dataDetail.length !== 0 &&
                  dataDetail[i]?.types &&
                  dataDetail[i]?.types.length !== 0
                    ? dataDetail[i]?.types.map((itemButton) => (
                        <Button size="small">
                          {itemButton?.type?.name ?? ''}
                        </Button>
                      ))
                    : null}
                </CardActions>
              </Card>
            );
          })
        : null}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
