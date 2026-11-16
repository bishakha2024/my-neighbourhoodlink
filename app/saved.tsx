import React from 'react';
import { Text } from 'react-native';
import { Screen } from '../src/components/Screen';
import { AppHeader } from '../src/components/AppHeader';
import { ListingCard } from '../src/components/ListingCard';
import { ServiceCard } from '../src/components/ServiceCard';
import { useData } from '../src/context/DataContext';
export default function Saved() {
 const { listings, services, savedKeys, loading } = useData();
 const items = listings.filter(item => savedKeys.includes(`listing:${item.id}`));
 const offers = services.filter(item => savedKeys.includes(`service:${item.id}`));
 return <Screen><AppHeader title="Saved listings" back /><Text>Private bookmarks for this account on this device.</Text>{loading ? <Text>Loading saved listings…</Text> : <>{!items.length && !offers.length && <Text>No saved listings available. Tap Save on an item or service in the marketplace. Deleted listings no longer appear here.</Text>}{items.map(listing => <ListingCard key={listing.id} listing={listing} />)}{offers.map(service => <ServiceCard key={service.id} service={service} />)}</>}</Screen>;
}
