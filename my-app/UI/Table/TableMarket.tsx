import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {ProductType} from "../../redux/beer/ProductType";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  maxWidth: 70,
  'img': {
    width: '30%'
  },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const styledTableCellProps = [
  {title: 'Item'},
  {title: 'Title'},
  {title: 'Category'},
  {title: 'Volume'},
]

export default function CustomizedTablesMarket({dragStartHandler, dragLeaveHandler, data}: any) {
  const {market} = useTypedSelector(state => state.products)
  console.log('===>market', market)

  return (
    <div
      style={{height: 680, border: "1px solid black", borderRadius: '6px'}}
    >
      <TableContainer component={Paper}>
        <Table
          style={{height: 657.500}}
        >
          <TableHead>
            <TableRow>
              {styledTableCellProps?.map((style) => (
                <StyledTableCell>{style.title}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {market?.map((product: ProductType) => (
              <StyledTableRow
                onDragStart={(e) => dragStartHandler(e, product)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                className={'beers'}
                draggable={true}
                key={product.id}>
                <StyledTableCell>
                  <img draggable={false} src={product.image} alt='itemImg'/>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" draggable={false}>
                  {product.title}
                </StyledTableCell>
                <StyledTableCell draggable={false}>{product.category}</StyledTableCell>
                <StyledTableCell draggable={false}>{product.price}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}