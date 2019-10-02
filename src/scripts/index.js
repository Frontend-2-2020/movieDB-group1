import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.scss';
import queryString from 'query-string';

// Access function of wehter 'overview' or 'detail'
import { initOverview } from './overview.js';
import { initDetail } from './detailpage.js';

const parsed = queryString.parse(location.search);
console.log(parsed);

// Get URL to decide wich script to execute
if(parsed.movie){
  initDetail();
  console.log('details');
}else{
  initOverview();
  console.log('home');
}