import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet,CardStyleInterpolators,Image } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { selectPoints } from '../slices/navSlice';
import { setPoints } from '../slices/navSlice';
export  function Vouchers() {
  const dispatch = useDispatch();
  const initialVoucherData = [
    {
      voucher_id: 'vmVNItOz',
      company_name: 'ABC Electronics',
      offer: 'Get 10% off on electronics',
    },
    {
      voucher_id: 'B9uXxcu8',
      company_name: 'XYZ Supermarket',
      offer: 'Buy 1 Get 1 Free on groceries',
    },
    {
      voucher_id: 'Y79Elxxf',
      company_name: 'Star Fitness',
      offer: '1-month free gym membership',
    },
    {
      voucher_id: '7ofdfA1H',
      company_name: 'Fashion Hub',
      offer: 'Flat 20% off on clothing',
    },
    {
      voucher_id: 'Z3IjNUxw',
      company_name: 'Tech Haven',
      offer: 'Up to 50% off on tech gadgets',
    },
    {
      voucher_id: 'GFQfU04H',
      company_name: 'Healthy Bites',
      offer: 'Free salad with any meal purchase',
    },
    {
      voucher_id: 'J574PWDI',
      company_name: 'Travel Explorers',
      offer: '10% discount on travel packages',
    },
    {
      voucher_id: 'R9Nb4XMK',
      company_name: 'Beauty Emporium',
      offer: 'Buy 2 beauty products, get 1 free',
    },
    {
      voucher_id: 'ZaGHyQBW',
      company_name: 'Pet Paradise',
      offer: 'Free pet grooming session',
    },
    {
      voucher_id: 'AZDJhQIj',
      company_name: 'Coffee Haven',
      offer: 'Get a free coffee with any pastry',
    },
    {
      voucher_id: 'PdJkq5dX',
      company_name: 'Bookworm Delight',
      offer: '20% off on all books',
    },
    {
      voucher_id: 'zgckMEb5',
      company_name: 'Sports Unlimited',
      offer: 'Buy sports equipment and get a fitness class free',
    },
    {
      voucher_id: 'o7O6oU77',
      company_name: 'Artistic Expressions',
      offer: '10% discount on art supplies',
    },
    {
      voucher_id: 'yhJC17M8',
      company_name: 'Cinephile Cinema',
      offer: 'Buy 2 movie tickets, get 1 free',
    },
    {
      voucher_id: '93XJ4IZc',
      company_name: 'Home Decor Emporium',
      offer: 'Flat 30% off on home decor items',
    },
    {
      voucher_id: 'IW3r4yuu',
      company_name: 'Tech Innovators',
      offer: 'Free tech consultation session',
    },
    {
      voucher_id: 'ssPHUmTW',
      company_name: 'Fitness World',
      offer: 'Get a free fitness assessment',
    },
    {
      voucher_id: 'q2kxh0NO',
      company_name: 'Gourmet Delights',
      offer: 'Buy 1 gourmet meal, get dessert free',
    },
    {
      voucher_id: 'ESgLIjgh',
      company_name: 'Adventure Tours',
      offer: '15% off on adventure tour bookings',
    },
    {
      voucher_id: 'nVaECZ6J',
      company_name: 'Spa Serenity',
      offer: '1-hour spa session at half price',
    },
    {
      voucher_id: 'ucgHfuCv',
      company_name: 'Fashion Trends',
      offer: 'Buy 3 fashion items, get 1 free',
    },
    {
      voucher_id: 'VBQ4Ah2o',
      company_name: 'Food Fusion',
      offer: '10% off on fusion cuisine',
    },
    {
      voucher_id: '7XnSf6pM',
      company_name: 'Adventure Awaits',
      offer: 'Free adventure gear rental',
    },
    {
      voucher_id: 'lhpaJo4v',
      company_name: 'Pet Paradise',
      offer: 'Free pet grooming session',
    },
    {
      voucher_id: 'UYSDh7yA',
      company_name: 'Movie Magic',
      offer: 'Buy 1 movie ticket, get popcorn and soda free',
    },
    {
      voucher_id: 'otrsVQ5z',
      company_name: 'Coffee Delights',
      offer: '20% off on coffee beverages',
    },
    {
      voucher_id: 'jfnlKU1k',
      company_name: 'Home Sweet Home',
      offer: 'Free interior design consultation',
    },
    {
      voucher_id: 'scirg8d8',
      company_name: 'Tech Haven',
      offer: 'Up to 50% off on tech gadgets',
    },
    {
      voucher_id: 'ESaV4VON',
      company_name: 'Gourmet Delights',
      offer: 'Buy 1 gourmet meal, get dessert free',
    },
    {
      voucher_id: 'gjozglpa',
      company_name: 'Fashion Trends',
      offer: 'Buy 3 fashion items, get 1 free',
    },
    {
      voucher_id: 'FTl8b9S5',
      company_name: 'Sports Unlimited',
      offer: 'Buy sports equipment and get a fitness class free',
    },
    {
      voucher_id: 'I6xNPSLV',
      company_name: 'Artistic Expressions',
      offer: '10% discount on art supplies',
    },
    {
      voucher_id: 'nqvec5HB',
      company_name: 'Cinephile Cinema',
      offer: 'Buy 2 movie tickets, get 1 free',
    },
    {
      voucher_id: 'VfW9C20I',
      company_name: 'Tech Innovators',
      offer: 'Free tech consultation session',
    },
    {
      voucher_id: 'pQJcL9xT',
      company_name: 'Fashion Hub',
      offer: 'Flat 20% off on clothing',
    },
    {
      voucher_id: 'gxXPJTWE',
      company_name: 'Travel Explorers',
      offer: '10% discount on travel packages',
    },
    {
      voucher_id: 'zdji117c',
      company_name: 'Beauty Emporium',
      offer: 'Buy 2 beauty products, get 1 free',
    },
    {
      voucher_id: 'PjwSun1N',
      company_name: 'Bookworm\'s Delight',
      offer: '20% off on all books',
    },
    {
      voucher_id: 'DJ3Uquzw',
      company_name: 'Healthy Bites',
      offer: 'Free salad with any meal purchase',
    },
    {
      voucher_id: 'a8J5wI9r',
      company_name: 'Pet Paradise',
      offer: 'Free pet grooming session',
    },
    {
      voucher_id: 'iKy0sthC',
      company_name: 'Coffee Haven',
      offer: 'Get a free coffee with any pastry',
    },
    {
      voucher_id: 'nVwnhSkP',
      company_name: 'Adventure Tours',
      offer: '15% off on adventure tour bookings',
    },
    {
      voucher_id: 'F0lN7KFs',
      company_name: 'Spa Serenity',
      offer: '1-hour spa session at half price',
    },
    {
      voucher_id: 'TzTHQMPL',
      company_name: 'Fashion Trends',
      offer: 'Buy 3 fashion items, get 1 free',
    },
    {
      voucher_id: 'eD9pQuNV',
      company_name: 'Food Fusion',
      offer: '10% off on fusion cuisine',
    },
    {
      voucher_id: 'FiSN54IY',
      company_name: 'Adventure Awaits',
      offer: 'Free adventure gear rental',
    },
    {
      voucher_id: 'm5qnpxbr',
      company_name: 'Movie Magic',
      offer: 'Buy 1 movie ticket, get popcorn and soda free',
    },
    {
      voucher_id: 'LvPZ02if',
      company_name: 'Coffee Delights',
      offer: '20% off on coffee beverages',
    },
    {
      voucher_id: 'jdbVDu2M',
      company_name: 'Home Sweet Home',
      offer: 'Free interior design consultation',
    },
    {
      voucher_id: 'qotAYrt3',
      company_name: 'Tech Haven',
      offer: 'Up to 50% off on tech gadgets',
    },
    {
      voucher_id: 'gFTGztYk',
      company_name: 'Gourmet Delights',
      offer: 'Buy 1 gourmet meal, get dessert free',
    },
    {
      voucher_id: 'YOoBGONd',
      company_name: 'Fashion Trends',
      offer: 'Buy 3 fashion items, get 1 free',
    },
    {
      voucher_id: 'cqxN0a48',
      company_name: 'Sports Unlimited',
      offer: 'Buy sports equipment and get a fitness class free',
    },
    {
      voucher_id: 'NMJhbK0E',
      company_name: 'Artistic Expressions',
      offer: '10% discount on art supplies',
    },
    {
      voucher_id: 'hTOqR370',
      company_name: 'Cinephile Cinema',
      offer: 'Buy 2 movie tickets, get 1 free',
    },
    {
      voucher_id: 'NhAyNQxt',
      company_name: 'Tech Innovators',
      offer: 'Free tech consultation session',
    },
    {
      voucher_id: 'PXOfztvN',
      company_name: 'Fashion Hub',
      offer: 'Flat 20% off on clothing',
    },
    {
      voucher_id: 'aZWM3FOk',
      company_name: 'Travel Explorers',
      offer: '10% discount on travel packages',
    },
    {
      voucher_id: 'jqObaLWq',
      company_name: 'Beauty Emporium',
      offer: 'Buy 2 beauty products, get 1 free',
    },
    {
      voucher_id: 'oUxPoQXw',
      company_name: 'Bookworm\'s Delight',
      offer: '20% off on all books',
    },
    {
      voucher_id: 'ESWF1Fg8',
      company_name: 'Healthy Bites',
      offer: 'Free salad with any meal purchase',
    },
    {
      voucher_id: 'sF5kU1UV',
      company_name: 'Pet Paradise',
      offer: 'Free pet grooming session',
    },
    {
      voucher_id: 'f5IXIbqk',
      company_name: 'Coffee Haven',
      offer: 'Get a free coffee with any pastry',
    },
    {
      voucher_id: 'TC1a4LVm',
      company_name: 'Adventure Tours',
      offer: '15% off on adventure tour bookings',
    },
    {
      voucher_id: 'rVWu3ab2',
      company_name: 'Spa Serenity',
      offer: '1-hour spa session at half price',
    },
    {
      voucher_id: 'adarjxZX',
      company_name: 'Fashion Trends',
      offer: 'Buy 3 fashion items, get 1 free',
    },
    {
      voucher_id: 'QEUYyYvB',
      company_name: 'Food Fusion',
      offer: '10% off on fusion cuisine',
    },
    {
      voucher_id: 'tmERTmj0',
      company_name: 'Adventure Awaits',
      offer: 'Free adventure gear rental',
    },
    {
      voucher_id: 'YC5OlnvS',
      company_name: 'Movie Magic',
      offer: 'Buy 1 movie ticket, get popcorn and soda free',
    },
    {
      voucher_id: 'mrOoAiqa',
      company_name: 'Coffee Delights',
      offer: '20% off on coffee beverages',
    },
    {
      voucher_id: 'R8scQFNJ',
      company_name: 'Home Sweet Home',
      offer: 'Free interior design consultation',
    },
    {
      voucher_id: '3XnDYgjP',
      company_name: 'Tech Haven',
      offer: 'Up to 50% off on tech gadgets',
    },
    {
      voucher_id: 'wyKsocak',
      company_name: 'Gourmet Delights',
      offer: 'Buy 1 gourmet meal, get dessert free',
    },
    {
      voucher_id: 'twXONwKz',
      company_name: 'Fashion Trends',
      offer: 'Buy 3 fashion items, get 1 free',
    },
    {
      voucher_id: 'N3ev7oSo',
      company_name: 'Sports Unlimited',
      offer: 'Buy sports equipment and get a fitness class free',
    },
    {
      voucher_id: 'jENw8iI0',
      company_name: 'Artistic Expressions',
      offer: '10% discount on art supplies',
    },
    {
      voucher_id: 'FNE1iaeb',
      company_name: 'Cinephile Cinema',
      offer: 'Buy 2 movie tickets, get 1 free',
    },
    {
      voucher_id: 'p3SGTuiL',
      company_name: 'Tech Innovators',
      offer: 'Free tech consultation session',
    },
    {
      voucher_id: 'JQ7Qro0F',
      company_name: 'Fashion Hub',
      offer: 'Flat 20% off on clothing',
    },
    {
      voucher_id: '2tz2QfnQ',
      company_name: 'Travel Explorers',
      offer: '10% discount on travel packages',
    },
    {
      voucher_id: 'oNKsORI6',
      company_name: 'Beauty Emporium',
      offer: 'Buy 2 beauty products, get 1 free',
    },
    {
      voucher_id: 'QCruGfPK',
      company_name: 'Bookworm\'s Delight',
      offer: '20% off on all books',
    }
  ]



  const [voucherData, setVoucherData] = useState(initialVoucherData);
  const points=  useSelector(selectPoints);

  const handleVoucherClick = (item) => {
    if (!item.disabled && points >  500) {
      // Redirect to the voucher link (e.g., BigBasket)
      Linking.openURL('https://www.bigbasket.com/');
  
      // Deduct points
      setPoints(points - 20);
  
      // Disable the clicked voucher and keep other vouchers unchanged
      setVoucherData((prevData) =>
        prevData.map((voucher) =>
          voucher.voucher_id === item.voucher_id
            ? { ...voucher, disabled: true }
            : voucher
        )
      );
    }
    if (points <= 100) {
      setVoucherData((prevData) =>
        prevData.map((voucher) => ({ ...voucher, disabled: true }))
      );
    }
  };
  

  const renderItem = ({ item }) => (
    <TouchableOpacity
    style={[styles.card, item.disabled && styles.disabledCard]}
    onPress={() => handleVoucherClick(item)}
  >
    <View style={styles.cardContent}>
      <Text style={[styles.companyName, item.disabled && styles.disabledText]}>
        {item.company_name}
      </Text>
      <Text style={[styles.offer, item.disabled && styles.disabledText]}>
        {item.offer}
      </Text>
      <Text style={styles.voucherId}>Voucher ID: {item.voucher_id}</Text>
    </View>
  </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>{points}</Text>
        <Image  source={require('../assets/points.png')} style={styles.pointsText}></Image>
      </View>
      <FlatList
  data={voucherData}
  renderItem={renderItem}
  keyExtractor={(item) => item.voucher_id} // Use the 'id' field as the key
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  pointsText: {
fontWeight:'bold',
    marginHorizontal: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    alignItems: 'center',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  offer: {
    fontSize: 16,
    marginVertical: 5,
  },
  voucherId: {
    fontSize: 14,
    color: '#555',
  },
  disabledItem: {
    backgroundColor: '#eee',
  },
  disabledCard: {
    backgroundColor: '#eee', // Grey background for disabled vouchers
  },
  disabledText: {
    color: 'grey', // Grey text color for disabled vouchers
  },
});
