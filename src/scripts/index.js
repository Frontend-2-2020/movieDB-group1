import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.scss';
import queryString from 'query-string';

// Access function of wehter 'overview' or 'detail'
import { initOverview } from './overview.js';
import { initDetail } from './detailpage.js';

const parsed = queryString.parse(location.search);
console.log('parsed', parsed);

// Get URL to decide wich script to execute
if(parsed.movie){
  initDetail();
  hideShow('intropage');
  console.log('details');
}else{
  initOverview();
  hideShow('detailpage');
  console.log('home');
}

function hideShow(id) {
  var el = document.getElementById(id);
  if (el.style.display === "none") {
    el.style.display = "block";
  } else {
    el.style.display = "none";
  }
}