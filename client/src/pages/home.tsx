import { useList } from '@pankod/refine-core';
import { PieChart, PropertyReferrals, TotalRevenue, PropertyCard } from 'components';
import { Box, Typography, Stack } from '@pankod/refine-mui';



const Home = () => {
  const {data, isLoading, isError} = useList({
    resource: 'properties',
    config: {
      pagination: {
        pageSize: 3
      }
    }

  })

  const latestProperties = data?.data ?? [];
  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>Something went Wrong...</div>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={27} color="#11142D"> Dashboard</Typography>
      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart 
        title="Properties for sale"
        value={648}
        series= {[40,60]}
        colors={['#475be8', '#e4e8ef']} />
        <PieChart 
        title="Properties for Rent"
        value={648}
        series= {[55,45]}
        colors={['#475be8', '#e4e8ef']} />
        <PieChart 
        title="Properties for Total Customers"
        value={648}
        series= {[75,25]}
        colors={['#475be8', '#e4e8ef']} />
        <PieChart 
        title="Properties for Cities"
        value={648}
        series= {[85,15]}
        colors={['#475be8', '#e4e8ef']} />
      </Box>
      <Stack mt="25px" width="100%" direction={{xs: 'column', lg: 'row'}} gap={4}>
        <TotalRevenue/>
        <PropertyReferrals/>
      </Stack>
      <Box flex={1} borderRadius='14px' padding= '20px' bgcolor='£fcfcfc' display='flex' flexDirection='column' minWidth='100%' mt='25px'>
      <Typography fontSize='18px' fontWeight={600} color='#11142D'> Latest Properties</Typography> 
      <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4}}>
      {latestProperties.map((property) => (
        <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            location={property.location}
            price={property.price}
            photo={property.photo}
        />
    ))}        
      </Box>
      </Box>
    </Box>
  )
}

export default Home