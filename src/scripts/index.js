import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.scss';
import queryString from 'query-string';

// Access function of wehter 'overview' or 'detail'
import { initOverview } from './overview.js';
import { initDetail } from './detailpage.js';

const parsed = queryString.parse(location.search);
console.log(parsed);

// Get URL to decide wich script to execute
          //TODO uncomment hideShow() when all is ready!!!!
if(parsed.movie){
  initDetail();
  //hideShow('intropage');
  console.log('details');
}else{
  initOverview();
  //hideShow('detailpage');
  console.log('home');
}

// SIDENOTE :: this function in this file, in detail.js & overview.js or seperate .js and import?
// Hide one div if the other is visible (toggle)
function hideShow(id) {
  var el = document.getElementById(id);
  if (el.style.display === "none") {
    el.style.display = "block";
  } else {
    el.style.display = "none";
  }
}