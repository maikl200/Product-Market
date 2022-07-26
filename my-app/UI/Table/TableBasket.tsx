import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useGetBeersQuery} from "../../redux/beer/beersApi";
import {beersType} from "../../redux/beer/beersType";
import {FC} from "react";
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
  }
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return {name, calories, fat, carbs, protein};
}

interface TableBasketProp {
  dropHandler: (e: any, beer: any) => void
  dragOverHandler: (e: any) => void
}

export default function CustomizedTablesBasket({dropHandler, dragOverHandler}: TableBasketProp) {
  const {selectBeer} = useTypedSelector(state => state.selectBeer)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Beers</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Volume</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectBeer?.map((beer: beersType) => (
            <StyledTableRow
              className={'beers'}
              onDrop={(e) => dropHandler(e, beer)}
              draggable={true}
              key={beer.id + 1}>
              <StyledTableCell>
                <img src={beer.image_url} alt='beerImg'/>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {beer.name}
              </StyledTableCell>
              <StyledTableCell align="right">{beer.description}</StyledTableCell>
              <StyledTableCell align="right">{beer.volume.unit} {beer.volume.value}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}