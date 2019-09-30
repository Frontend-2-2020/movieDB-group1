import '../styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';

import queryString from 'query-string';

const parsed = queryString.parse(location.search);
console.log(parsed);
console.log('webpack starterkit');
