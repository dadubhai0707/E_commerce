import { useEffect, useState } from 'react';
import Box from '../../Component/Admin/Box';
import Aheader from '../../Component/Common/Aheader';
import Graph from '../../Component/Admin/grafah';
import { Container, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

function AHome() {
  const Totalproduct = useSelector((state) => state.product.product);
  const order = useSelector((state) => state.order.order);
  const user =useSelector((state)=>state.auth.user)
  // ___________________________________
  // Find Total length of all Orders across all users
  // ___________________________________
  const [totalOrder, setTotalOrder] = useState(0);

  useEffect(() => {
    const totalOrders = order.reduce((acc, userOrder) => acc + userOrder.orders.length, 0);
    setTotalOrder(totalOrders);
  }, [order]);

  return (
    <>
      <Container>
        <div className="header">
          <Aheader name={'Dashboard'} />
        </div>
        <Grid container spacing={2} style={{ margin: '1px' }}>
          <Grid item xs={12} sm={4}>
            <Box name={'Total Product'} navigate={'/admin/dashboard/product'} total={Totalproduct.length} btnName="Seen Product" description={'Total Product Listed'} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box name={`Orders`} total={totalOrder} navigate={'/admin/dashboard/order'} btnName="Seen Orders" description={'Total Orders Processed'} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box name={'Total Users'} total={user.length} btnName="Seen Users" description={'Total Users Registered'} />
          </Grid> 
        </Grid>
        <div className="graph-section">
          <Graph />
        </div>
      </Container>
    </>
  );
}

export default AHome;
